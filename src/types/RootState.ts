import { RouterState } from 'connected-react-router';
import { HomePageState } from 'app/containers/HomePage/types';
import { ExampleState } from 'app/containers/Example/types';
import { Web3State } from 'app/containers/Web3/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  global?: any;
  homePage?: HomePageState;
  router?: RouterState;
  example?: ExampleState;
  web3?: Web3State;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
