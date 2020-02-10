import React, { Suspense, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from '../configs/routes'
import login from './login'
import { UserProvider } from '../configs/context'
import LayoutDesign from './layout'
import Loading from './../Components/loading'
import register from './register'

function root() {
    const [isAuth, setAuth] = useState(!!window.localStorage.getItem('token'))
    return (
        <UserProvider value={setAuth} >
            <Suspense fallback={<Loading></Loading>}>
                <BrowserRouter>
                    <Switch>
                        {routes &&
                            routes.map(route =>
                                <Route
                                    key={route.label}
                                    {...route}
                                    component={props1 => {
                                        const MyComponent = React.lazy(() =>
                                            import(`./${route.component}`)
                                        )
                                        if(route.label === 'register'){
                                            return <Route to='/register' component={register}></Route>
                                        }
                                        return (isAuth && route.label !== 'login') ? (
                                            <LayoutDesign >
                                                <MyComponent {...props1} {...route} />
                                            </LayoutDesign>
                                        ) : (
                                                <Route to='/' component={login}></Route>
                                            )
                                    }}
                                />
                            )}
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </UserProvider>

    )
}
export default root