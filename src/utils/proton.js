import { ConnectWallet } from '@proton/web-sdk'
import TasklyLogo from '../taskly-logo.svg'

class ProtonSDK {
  constructor() {
    this.chainId = process.env.REACT_APP_CHAIN_ID;
    this.endpoints = [process.env.REACT_APP_CHAIN_ENDPOINT]; // Multiple for fault tolerance
    this.appName = 'Taskly';
    this.requestAccount = 'taskly'; // optional
    this.session = null;
    this.link = null;
  }

  connect = async ({ restoreSession }) => {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        chainId: this.chainId,
        endpoints: this.endpoints,
        restoreSession,
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true,
      },
      selectorOptions: {
        appName: this.appName,
        appLogo: TasklyLogo,
      },
    });
    this.link = link;
    this.session = session;
  };

  login = async () => {
    try {
      await this.connect({ restoreSession: false });
      const { auth, accountData } = this.session;
      return {
        auth,
        accountData: accountData[0]
      };
    } catch (e) {
      return e;
    }
  };

  sendTransaction = async (actions) => {
    try {
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      return result;
    } catch (e) {
      return e;
    }
  };

  logout = async () => {
    await this.link.removeSession(this.requestAccount, this.session.auth);
  }

  restoreSession = async () => {
    try {
      await this.connect({ restoreSession: true });
      if (this.session) {
        const { auth, accountData } = this.session;
        return {
          auth,
          accountData: accountData[0],
        };
      }
    } catch(e) {
      return e;
    }
    return {
      auth: {
        actor: '',
        permission: ''
      },
      accountData: {}
    };
  }
}

const protonSDK = new ProtonSDK();
export default protonSDK;