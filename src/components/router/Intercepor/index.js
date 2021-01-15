import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { getAccessToken, getRefreshToken, setAccessToken } from '../../../utils/tokenService';
import { apiUrl } from '../../../api/baseUrl';

class Interceptor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interceptorId: null,
    };
  }

  componentDidMount() {
    this.setState({ interceptorId: this.interceptor() });
  }

  componentWillUnmount() {
    const { interceptorId } = this.state;
    axios.interceptors.response.eject(interceptorId);
  }

  interceptor() {
    return axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const { history } = this.props;
        try {
          if (error.response.status === 401 && !_.get(originalRequest, '_retry')) {
            const { data: { accessToken } } = await axios.post(
              `${apiUrl}/auth/refresh/merchant`,
              { token: getRefreshToken() },
              _.assign(originalRequest, { _retry: true }),
            );
            setAccessToken(accessToken);
            originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
            return axios(originalRequest);
          }
          if (error.response.status === 401 && _.get(originalRequest, '_retry') === true) {
            localStorage.clear();
            history.push('/');
            return Promise.reject(error);
          }

          return Promise.reject(error);
        } catch (e) {
          localStorage.clear();
          history.push('/');
          return Promise.reject(error);
        }
      },
    );
  }

  render() {
    return null;
  }
}

export default withRouter(Interceptor);
