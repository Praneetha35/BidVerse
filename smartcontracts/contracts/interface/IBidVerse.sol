//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IBidVerse {
    /**
     *  @notice The two types of organisation.
     *          `Product`: Organisation registered as product based.
     *          `Service`: Organisation registered as service based.
     */
    enum OrganisationType {
        Product,
        Service
    }

    /**
     *  @notice The two types of organisation.
     *          `Product`: Organisation registered as product based.
     *          `Service`: Organisation registered as service based.
     */
    enum ProfileStatus {
        OpenToWork,
        Hired,
        NotInterested
    }

    /**
     *  @notice The three types of candidate's bid decision.
     *          `Approved`: Bid approved by a candidate.
     *          `Rejected`: Bid rejected by a candidate.
     *          `Waiting`: Bid is waiting to be approved/rejected by a candidate.
     */
    enum BidDecision {
        Approved,
        Rejected,
        Waiting
    }

    /**
     * @dev For use in `addProfile` as a parameter type.
     *
     * @param name       The name of the candidate.
     * @param experience The experience of the candidate.
     * @param metaUri    The URI of the canidate that holds detailed information
     *                   about them and the resume document.
     *
     * @param profileUri   The URI to the display image of the profile.
     * @param domain       The domain of the profile.
     * @param designation  The designation of the profile.
     * @param skills       Skill set of the profile.
     * @param status       Working status of the profile.
     *
     */
    struct ProfileParams {
        string name;
        string experience;
        string uri;
        string profileUri;
        string domain;
        string designation;
        string[] skills;
        ProfileStatus status;
        uint8 validity;
    }

    /**
     * @notice The information related to a candidate in BidVerse.
     *
     * @dev The Profile at ID `profileId` determines the history of users.
     *
     * - `profileId`: The ID of the profile.
     * - `createdAt`: The time when the profile was created.
     * - `updatedAt`: The time when the profile was last updated.
     */
    struct Profile {
        uint256 profileId;
        string[] uriHistory;
        string experience;
        string domain;
        string designation;
        string[] skills;
        string profileUri;
        ProfileStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        uint256 highestBid;
        uint256 profileValidity;
        uint8 bidApprovalCount;
        bool profileIntegrity;
    }

    /**
     * @dev For use in `addOrganisation` as a parameter type.
     *
     * @param name      The name of the organisation.
     * @param age       The age of the organisation.
     *
     * @param metaUri   The URI of the organisation that holds detailed information
     *                  about the organisation.
     *
     * @param orgType   The type of organisation. See `OrganisationType` for more details.
     */
    struct OrganisationParams {
        string name;
        string age;
        string metaUri;
        OrganisationType orgType;
    }

    /**
     * @notice The information related to an Organisation in BidVerse.
     *
     * @dev The Organisation at ID `organisationId` determines the details of organisation.
     *
     * - `orgId`     : The ID of an organisation auto generated.
     * - `name`      : Name of an organisation.
     * - `age`       : Years of service of an organisation.
     * - `metaUri`   : Metadata URI of an organisation.
     * - `type`      : Type of an organisation.
     * - `createdAt` : The time when the organisation was created.
     * - `updatedAt` : The time when the organisation was last updated.
     * - `verified`  : The verification status of an organisation.
     */
    struct Org {
        uint256 orgId;
        string name;
        string age;
        string metaUri;
        OrganisationType orgType;
        uint256 createdAt;
        uint256 updatedAt;
        bool verified;
    }

    /**
     * @notice The information is related to a candidate's bid.
     *
     * @dev The Profile at ID `profileId` determines the history of users.
     * createdAt: The time when the profile was created.
     *
     * - `candidate`: The address of the candidate.
     * - `role`: The role for which the candidate will work.
     * - `bid`: The bid amount a organization is willing to pay.
     */
    struct Bid {
        uint256 bidId;
        address candidate;
        address organisation;
        uint256 bid;
        string role;
        BidDecision decision;
    }

    struct InterviewRequest {
        uint256 requestId;
        address candidate;
        string organisation;
        string jobDescription;
        BidDecision decision;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /**
     * @notice The information related to a userBids in BidVerse.
     *
     * @dev The List of bids a user has.
     *
     * - `org`: The org details for more see IBidVerse.Org
     * - `bid`: The bid details for more see IBidVerse.Bid
     */
    struct UserBids {
        Bid bid;
        Org org;
    }

    /**
     * @notice The information related to a users address.
     *
     * - `user`: For more see IBidVerse.Profile
     * - `org`: For more see IBidVerse.Org
     */
    struct WhoAmI {
        Profile user;
        Org org;
    }

    /**
     * @dev Event emitted when a Profile is created for `to` at `time`.
     */
    event ProfileCreated(address indexed to, uint256 time);

    /**
     * @dev Event emitted when a Profile is created for _to at _time.
     */
    event OrganisationCreated(
        address indexed to,
        uint256 orgId,
        uint256 createdAt
    );

    /**
     * @dev Event emitted when a Bid is approved by a candidate.
     */
    event BidApproved(uint256 bidId);

    /**
     * @dev Event emitted when a Bid is rejected by a candidate.
     */
    event BidRejected(uint256 bidId);

    /**
     * @notice Creates a new Profile for caller with resume `_uri`.
     */
    function addProfile(ProfileParams calldata _params) external;

    /**
     *
     * @dev Event emitted when a Bid is place for `candidate` with `bidAmount` for `role`.
     */
    event BidPlaced(address candidate, uint256 bidAmount, string role);

    /**
     * @dev Creates a new Profile for caller with resume `_uri`.
     */
    function addOrganisation(OrganisationParams calldata _params) external;

    /**
     * @dev Places a bid for a `candidate` with `bidAmount` for `role`.
     */
    function placeBid(
        address candidate,
        uint256 bidAmount,
        string memory role
    ) external;

    /**
     * @dev Lets candidate to update their profile to BidVerse.
     */

    function approveOrRejectBid(uint256 bidId, BidDecision decision) external;

    /**
     * @dev Returns the profileDetails of the `profileId` token.
     *
     * Requirements:
     *
     * - `profileId` must exist.
     */
    function getProfile(uint256 _profileId)
        external
        view
        returns (Profile memory);

    /**
     * @dev Returns the Bids of the `msg.sender` where msg.sender is a organisation.
     *
     * Requirements:
     *
     * - `msg.sender` must exist.
     */
    function getBidsByOrg() external view returns (Bid[] memory);

    /**
     * @dev Returns the UserBids of the `msg.sender` where msg.sender is a candidate.
     *
     * Requirements:
     *
     * - `msg.sender` must exist.
     */
    function getBidsByCandidate() external view returns (UserBids[] memory);

    /**
     *
     * @dev Event emitted when a Org requested interview for `candidate`.
     */
    event InterviewOffered(address candidate);
}
