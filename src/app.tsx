import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'material-react-toastify';
import React, { lazy, Suspense, useEffect } from 'react';
import { useHardwareConcurrency } from 'react-adaptive-hooks/hardware-concurrency';
import { useMemoryStatus } from 'react-adaptive-hooks/memory';
import { useNetworkStatus } from 'react-adaptive-hooks/network';
import { useSaveData } from 'react-adaptive-hooks/save-data';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { SplashScreen } from 'src/components/static/splash-screen/splash-screen';
import { Toast } from 'src/components/static/toast';
import PrivateRoute from 'src/private-route';
import actions from 'src/redux/actions';
import { IAppSettingState } from 'src/redux/appSetting/types';
import 'src/scss/toastify/ReactToastify.css';
import { userLogin } from 'src/services/api/user.api';
import { environment } from '../environments/environment';
import { localStore } from './helpers/storage-helper';
import './helpers/translate-helper';
import { AppState } from './redux/store';
import { theme } from './theme';


// Main Route With Different Layout
const loginPage = lazy(() => import('./pages/login'));
const dashboardPage = lazy(() => import('./pages/dashboard'));
const notFoundPage = lazy(() => import('./pages/not-found'));

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { numberOfLogicalProcessors } = useHardwareConcurrency();
  const { effectiveConnectionType } = useNetworkStatus();
  const { deviceMemory } = useMemoryStatus();
  const { saveData } = useSaveData();
  const { direction, token, locale, toast } = useSelector(
      (state: AppState) => ({
        direction: state.AppSetting.direction,
        token: state.User.token,
        locale: state.AppSetting.locale,
        toast: state.AppSetting.toast,
      })
  );

  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    // Check System Hardware
    // console.log( effectiveConnectionType, deviceMemory, saveData, numberOfLogicalProcessors );

    const defaultLng =
      window.location.pathname.split('/')[1] || localStore.get('lng');
    if (defaultLng && (defaultLng == 'en' || defaultLng == 'fa')) {
      dispatch(actions.AppSetting.setLocale(defaultLng));
    } else {
      localStore.set('lng', environment.initialLang.lng);
      dispatch(actions.AppSetting.setLocale(environment.initialLang.lng as IAppSettingState[ 'locale' ]));
    }

    if (environment.production) return;
    userLogin({ username: 'admin', password: 'admin' }).subscribe({
      next(response: any) {
        const token = response.access;
        dispatch(actions.User.setUserInfo({ token, firstName: '', avatar: '' }));
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={createMuiTheme(theme({ direction }))}>
        <CssBaseline />
        <ToastContainer
          hideProgressBar
          draggable
          pauseOnFocusLoss
          position={direction === 'ltr' ? 'top-right' : 'top-left'}
        />
        {toast.message && (
          <Toast key={new Date().getTime().toString()} data={toast} />
        )}
        <Suspense fallback={<SplashScreen />}>
          <Switch>
            <Route exact path={`/404`} component={notFoundPage} />
            <Route exact path={`/login`} component={loginPage} />
            <PrivateRoute
              path={[ `/${locale}/`, '/' ]}
              component={dashboardPage}
            />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
