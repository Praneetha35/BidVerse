import React from 'react';

import A from 'components/A';
// import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      {/* <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section> */}
      {/* <section>
        <LocaleToggle />
      </section> */}
      {/* <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
          }}
        />
      </section> */}
    </Wrapper>
  );
}

export default Footer;
