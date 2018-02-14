import {connect} from 'socket.io-client';

import {SOCKET_URL} from './config';

export default connect(SOCKET_URL);
