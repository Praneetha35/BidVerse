//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

// Interface for BidVerse
import "./interface/IBidVerse.sol";
import "./interface/IBidVerseProfile.sol";

// Initializer for Upgradable
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// Utils
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

// Access
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title BidVerse
 * @dev This contract allows end user to create their work profile on a decentralized
 * platform `BidVerse`. Allowing organisations to bid on their work / resume.
 *
 * NOTE: This contract assumes each cadidate as a {ERC721} holding their resume as metadata.
 */

contract BidVerse is
    IBidVerse,
    Initializable,
    ContextUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    // OrganisationId tracker
    CountersUpgradeable.Counter private _orgIdTracker;

    // User Profile
    IBidVerseProfile private _bidverseProfiler;

    // Mapping from candidate to profileId.
    mapping(address => Profile) private _profiles;

    // Mapping from organisation to organisationId.
    mapping(address => Org) private _organisations;

    // Mapping from address to their total biddings for both candidate and organizations
    mapping(address => uint256) private _totalBiddings;

    // Mapping for bids with count
    mapping(uint256 => Bid) private _bids;

    // Mapping for bids with count
    mapping(uint256 => InterviewRequest) private _iRequests;

    /**
     * @dev Creates an instance of `BidVerse` with `_profile` as the {ERC721} of profiles.
     *
     * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
     * duplicates in `payees`.
     *
     * Requirements:
     *
     * - `_profile` must be a non-zero address.
     */
    function initialize(address _profiler) public initializer {
        require(_profiler != address(0), "ZERO_ADDRESS.");
        _bidverseProfiler = IBidVerseProfile(_profiler);

        __Ownable_init();
        _orgIdTracker.increment();
    }

    /**
     * @dev Lets candidate to add their profile to BidVerse.
     *
     * @param _params Refer IBidVerse-{ProfileParams}
     *
     * Requirements:
     *
     * - `msg.sender` must be a new cadidate.
     */
    function addProfile(ProfileParams calldata _params) external override {
        require(_profiles[msg.sender].profileId == 0, "PROFILE_EXISTS.");
        require(
            _organisations[msg.sender].orgId == 0,
            "Organisations can't create user profiles"
        );
        uint256 _id = _bidverseProfiler.mintProfile(msg.sender, _params.uri);
        require(_id != 0, "MINT_FAILED.");

        string[] storage uris = _profiles[msg.sender].uriHistory;
        uris.push(_params.uri);

        uint256 timeStamp = block.timestamp;
        Profile memory _profile = Profile({
            profileId: _id,
            uriHistory: uris,
            experience: _params.experience,
            profileUri: _params.profileUri,
            domain: _params.domain,
            designation: _params.designation,
            skills: _params.skills,
            status: _params.status,
            createdAt: timeStamp,
            updatedAt: timeStamp,
            highestBid: 0,
            profileValidity: timeStamp + _params.validity * 1 days,
            bidApprovalCount: 0,
            profileIntegrity: true
        });
        _profiles[msg.sender] = _profile;

        emit ProfileCreated(msg.sender, _profile.createdAt);
    }

    /**
     * @dev Lets candidate to update their profile.
     *
     * @param candidate address of candidate which org request for interview
     *
     * Requirements:
     *
     * - `msg.sender` must be a cadidate.
     */

    function offerInterview(address candidate, string calldata jobDesc)
        public
        returns (bool)
    {
        require(
            block.timestamp < _profiles[candidate].profileValidity,
            "PROFILE_EXPIRED"
        );
        uint256 id = _requestCounter.current();
        uint256 timestamp = block.timestamp;
        InterviewRequest memory _req = InterviewRequest({
            requestId: id,
            candidate: candidate,
            organisation: _organisations[msg.sender].name,
            jobDescription: jobDesc,
            decision: BidDecision.Waiting,
            createdAt: timestamp,
            updatedAt: timestamp
        });

        _iRequests[id] = _req;
        _requestCounter.increment();

        emit InterviewOffered(candidate);

        return true;
    }

    function decideOfferRequest(uint256 requestId, BidDecision decision)
        public
        returns (bool)
    {
        require(
            _iRequests[requestId].decision == BidDecision.Waiting,
            "REQUEST_DECISION_ALREADY_MADE"
        );
        _iRequests[requestId].decision = decision;
        _iRequests[requestId].updatedAt = block.timestamp;

        return true;
    }

    /**
     * @dev Lets candidate to update their profile to BidVerse.
     *
     * @param candidate The address of the candidate                                                                                                  .
     * @param bidAmount The amount for which the canditate will work.
     * @param role The role in which the candidate will work.
     *
     * Requirements:
     *
     * - `msg.sender` should exist.
     */
    function placeBid(
        address candidate,
        uint256 bidAmount,
        string memory role
    ) external override {
        uint256 _bidCount = _bidCounter.current();
        Bid memory _bid = Bid({
            bidId: _bidCount,
            candidate: candidate,
            organisation: msg.sender,
            bid: bidAmount,
            role: role,
            decision: BidDecision.Waiting
        });
        if (_profiles[candidate].highestBid < bidAmount)
            _profiles[candidate].highestBid = bidAmount;
        _totalBiddings[candidate] += 1;
        _totalBiddings[msg.sender] += 1;
        _bids[_bidCount] = _bid;
        _bidCounter.increment();
        emit BidPlaced(candidate, bidAmount, role);
    }

    /**
     * @dev Lets candidate to update their profile to BidVerse.
     *
     * @param bidId The id of the Bid to be approved
     * @param decision The decision taken by candidate
     *
     * Requirements:
     *
     * - `msg.sender` should exist.
     * - `decision` should be a enum value as described in IBidVerse.BidVerse.
     */

    function approveOrRejectBid(uint256 bidId, BidDecision decision)
        public
        override
    {
        _bids[bidId].decision = decision;

        if (decision == BidDecision.Approved) {
            _profiles[msg.sender].bidApprovalCount += 1;

            if (_profiles[msg.sender].bidApprovalCount == 3)
                _profiles[msg.sender].profileIntegrity = false;

            emit BidApproved(bidId);
        } else emit BidRejected(bidId);
    }

    /**
     * @dev Lets candidate to add their profile to BidVerse.
     *
     * Requirements:
     *
     * - `msg.sender` must be a new cadidate.
     */
    function addOrganisation(OrganisationParams calldata _params)
        external
        override
    {
        require(_organisations[msg.sender].orgId == 0, "ORGANISATION_EXISTS.");

        require(
            _profiles[msg.sender].profileId == 0,
            "Profiles can't create organisations"
        );

        uint256 _id = _orgIdTracker.current();
        uint256 timeStamp = block.timestamp;
        Org memory _org = Org({
            orgId: _id,
            name: _params.name,
            age: _params.age,
            metaUri: _params.metaUri,
            orgType: _params.orgType,
            createdAt: timeStamp,
            updatedAt: timeStamp,
            verified: false
        });

        _organisations[msg.sender] = _org;
        emit OrganisationCreated(msg.sender, _id, timeStamp);
    }

    /**
     * @dev Returns the profileDetails of the `profileId` token.
     *
     * Requirements:
     *
     * - `profileId` must exist.
     *
     * NOTE Refer IBidVerse.sol for more details.
     */
    function getProfile(uint256 _profileId)
        external
        view
        override
        returns (Profile memory)
    {
        return _profiles[_bidverseProfiler.ownerOf(_profileId)];
    }

    /** @dev Returns the bids of the `msg.sender` where msg.sender is a organisation.
     *
     * Requirements:
     *
     * - `msg.sender` should exist.
     */
    function getBidsByOrg() public view override returns (Bid[] memory) {
        uint256 _index = 0;

        Bid[] memory bids = new Bid[](_totalBiddings[msg.sender]);

        for (uint256 bid = 0; bid < _bidCounter.current(); bid += 1) {
            Bid memory _bid = _bids[bid];
            if (_bid.organisation == msg.sender) {
                bids[_index] = _bid;
                _index += 1;
            }
        }
        return bids;
    }

    /**
     * @dev Returns the bids of the `msg.sender` where msg.sender is a candidate.
     *
     * Requirements:
     *
     * - `msg.sender` should exist.
     */
    function getBidsByCandidate()
        public
        view
        override
        returns (UserBids[] memory)
    {
        uint256 _index = 0;

        UserBids[] memory userBids = new UserBids[](_totalBiddings[msg.sender]);

        for (uint256 bid = 0; bid < _bidCounter.current(); bid += 1) {
            Bid memory _bid = _bids[bid];
            if (_bid.candidate == msg.sender) {
                userBids[_index].bid = _bid;
                userBids[_index].org = _organisations[_bid.organisation];
                _index += 1;
            }
        }
        return userBids;
    }

    // BidId tracker
    CountersUpgradeable.Counter private _bidCounter;

    // RequestId tracker
    CountersUpgradeable.Counter private _requestCounter;

    /**
     * @dev Returns the type of profile `msg.sender` is.
     *
     */
    function whoAmI() public view returns (WhoAmI memory) {
        WhoAmI memory _whoAmI = WhoAmI({
            user: _profiles[msg.sender],
            org: _organisations[msg.sender]
        });
        return _whoAmI;
    }

    function getMyInterviewOffers()
        public
        view
        returns (InterviewRequest[] memory)
    {
        uint256 _index = 0;

        InterviewRequest[] memory requests = new InterviewRequest[](
            _requestCounter.current()
        );

        for (
            uint256 request = 0;
            request < _requestCounter.current();
            request += 1
        ) {
            InterviewRequest memory _request = _iRequests[request];
            if (_request.candidate == msg.sender) {
                requests[_index] = _request;
                _index += 1;
            }
        }
        return requests;
    }

    // Mapping from address to their total requests for candidate
    mapping(address => uint256) private _totalRequests;
}
