// Lee detallada mente la imagen "./code_example.png" y realiza un analisis de su funcionalidad, y como lo podrias mejorar
//Pista, el codigo presentado handlea dos diferentes tipos de tokens (api token, session token)



/*
RESPUESTA:
Algunas mejoras que se me ocurren para este código son las siguientes:
- Hay variables dentro del localStorage que se están yendo a buscar más de una vez. Podrían guardarse en una constante y reutilizarse.
- Poner nombres de variables más descriptivos. Seguir un patrón que permita entender claramente qué función cumplen o para qué se van a usar. 
- Ya que es un componente escrito en typescript aprovechar mejor los beneficios que puede traer un sistema de tipado. Se pueden agregar interfaces de objecto y tipado explícito en los argumentos de las funciones.
- No se entiende cuál es la diferencia entre el auth y auth_token que se guardan en el localStorage, sería bueno ponerles un nombre más descriptivo al igual que a las funciones que los manejan.
- Se está accediendo constantemente a las variables de entorno usando el process.env. Esto en sí no es un problema pero mejoraría la lectura si se declara una constante para cada una y se utiliza dicha variable en su lugar.
- La autenticación del axios está repetida muchas veces. Quizás se podría usar una única instancia de axios con la autenticación ya configurada y reutilizarla.
- La función autoConnectSession y refreshToken hacen prácticamente lo mismo con pocas diferencias, quizás se podría unificar en una sola función para no repetir código.
- La constante config es muy utilizada en las funciones, sería bueno declararla una única vez y reutilizarla.
- Más abajo dejo especificado en el código algunas mejoras puntuales que se me ocurren indicándolas con un TODO
*/


import image from './code_example.png'


export const Layout = ({ children }) => {
    const {
        storageValue: auth_token,
        setValue: setAuthToken,
        removeltem: closeSession,
    } = useLocalStorage("auth_token", "");
    const { storageValue: auth, setValue: setAuth } = useLocalStorage(
        "auth",
        ""
    );
    const [userSession, setuserSession] = useState(null);
    const [products, setProducts] = useState(undefined); //En mi opinión sería mejor inicializarlo como un array vacío o en null.
    const [homeData, setHomeData] = useState(undefined); //Lo mismo acá.
    const actualCurrency = JSON.parse(localStorage.getlItem("currency")); //Habría que considerar el caso de que no haya una "currency" previamente seteada. La función setCurrency no se está usando en ningún lado.

    //auto connect session
    useEffect(() => {
        if (auth_token && !userSession) {
            autoConnectSession(true);

            actualCurrency && setCurrency(auth_token, actualCurrency.id, true);
        } else {
            refreshToken(auth);

            actualCurrency && setCurrency(auth, actualCurrency.id, false);
        }

        actualCurrency && updateCurrency(auth);
    }, []);

    //set preferred language
    useEffect(() => {
        if (
            userSession &&
            userSession.language &&
            userSession.language.code !== router.locale //TODO: Sería bueno considerar el caso de que alguna de estas variables no exista usando un operador ternario como se hace en la línea 67.
        ) {
            router.push(router.pathname, router.asPath, {
                locale: userSession.language.code,
            });
        }

        userSession &&
            userSession?.country_payment?.code === null &&
            getGeoInfo();
    }, [userSession]);

    useEffect(() => {
        if (auth) {
            getHomeData();
            getProducts();
        } else getToken();
    }, [auth]);

    //get tokenV1
    const getToken = async () => {
        try {
            const login = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v2/auth/login`,
                {
                    email: process.env.NEXT_PUBLIC_AUTH_USER,
                    password: process.env.NEXT_PUBLIC_AUTH_PASS,
                }
            );
            const auth = login.data;
            setAuth(auth.access_token);
        } catch (error) {
            return { error };
            //TODO: Sería bueno manejar el error de alguna manera además de retornarlo. 
        }
    };

    //auto connect
    const autoConnectSession = async (first = false) => {
        const auth_token2 = localStorage.getlItem("auth_token"); //TODO: En vez de ir a buscar lo mismo al localStorage dos veces y tener que nombrar a la variable como auth_token2 porque ya se está usando en la función setCountryPayment, sería mejor guardarlo en una constante fuera de la función y reutilizarla.

        if (!auth_token2) {
            return disconnectSession();
        } else {
            const config = {
                headers: { Authorization: `Bearer ${auth_token2}` },
            };
            try {
                const sendVerificationCode = await axios.post(
                    `${process.env.NEXT_PUBLIC_API}/api/v2/auth/refresh`,
                    {},
                    config
                );
                const { data } = sendVerificationCode;
                data.user && setuserSession(data.user);
                data.access_token && setAuth(data.access_token);
                data.access_token && setAuthToken(data.access_token); //TODO: Acá no termino de entender por qué al auth_token y el auth se les está seteando el mismo valor, son cosas distintas? Y sino, hace falta guardarlo dos veces? 
            } catch (error) {
                first && disconnectSession();
                //TODO: Sería bueno manejar el error de alguna manera. 
            }
        }
    };

    //auto connect
    const refreshToken = async (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const sendVerificationCode = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v2/auth/refresh`,
                {},
                config
            );
            const { data } = sendVerificationCode;
            data.access_token && setAuth(data.access_token);
        } catch (error) {
            //TODO: Sería bueno manejar el error de alguna manera. 
        }
    };

    //disconnect session
    const disconnectSession = async () => { //TODO: Sería bueno envolver el contenido de la función en un try catch para manejar errores.
        await closeSession();
        setuserSession(undefined); //TODO: En el useState se iniciliza este valor con null pero acá se esta usando undefined, sería mejor usar el mismo valor en ambos casos.
        await getToken();
        return router.push({
            pathname: "/login",
            query: { redirect: router.asPath },
        });
    };

    const getGeoInfo = async () => {
        try {
            const getGeo = await axios.get(
                `https://ipapi.co/json/?key=${process.env.NEXT_PUBLIC_IPAPIP}`,
                {}
            );
            const { data } = getGeo;
            const dd = await setCountryPayment(data.country_code); //TODO: Esta variable no se está usando en ningún lado, sería mejor no asignarla a ninguna variable y en caso de que se vaya a utilizar pornerle un nombre más descriptivo.
        } catch (error) {
            console.log(error);
            //TODO: Sería bueno manejar el error de alguna manera además del console.log.
        }
    };

    const setCountryPayment = async (code) => {
        const auth_token = localStorage.getlItem("auth_token"); //TODO: Ya se esá yendo a buscar en autoConnectSession, sería mejor guardarlo en una constante fuera de la función y reutilizarla.
        headers: { Authorization: `Bearer ${auth_token}` },
    };

    try {
        const sendVerificationCode = await axios.post( //TODO: Como no se está usando esta varible sería mejor no asignarla a ninguna variable.
            `${process.env.NEXT_PUBLIC_API}/api/v2/wallet-user/update/country/${code}`,
            {},
            config
        );
    } catch (error) {
        console.log(error);
        //TODO: Sería bueno manejar el error de alguna manera además del console.log.
    }
};

//getHomeData
const getHomeData = async () => {
    //get home data from api
};

//get products
const getProducts = async () => {
    //get products info from api
};

const updateCurrency = async (token) => { //TODO: No entiendo por qué en la función setCurrency se setean el auth y el auth_token, pero si tiene una función no deberían actualizarse acá esos mismos valores? 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const getCurrenciesOptions = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/api/v2/currencies/${actualCurrency.id}`,
            { ...config }
        );
        const currencyUpdated = getCurrenciesOptions.data;

        if (actualCurrency.value !== currencyUpdated.value) { //TODO: Acá también habría que tener en cuenta el caso de que no haya un actualCurrency previamente seteado.
            const currencyUpdate = {
                ...actualCurrency,
                value: currencyUpdated.value,
            };
            return localStorage.setltem(
                "currency",
                JSON.stringify(currencyUpdate)
            );
        }
    } catch (error) {
        //TODO: Sería bueno manejar el error de alguna manera. 
    };

    const setCurrency = async (token, id, session) => { //TODO: Esta función no se está usando en ningún lado.
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const setCurrency = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/api/v2/currencies/set`,
                { currency: id },
                { ...config }
            );

            const setcurrency = setCurrency.data; //TODO: Sería mejor ponerle distintos nombres a las variables en lugar del mismo nombre pero en minúscula para mayor claridad de qué función cumplen (por ejemplo la primera getCurrency y la segunda setCurrency).

            if (session) {
                setAuthToken(setcurrency.access_token);//TODO: Acá no termino de entender por qué al auth_token y el auth se les está seteando el mismo valor, son cosas distintas? Y sino, hace falta guardarlo dos veces? Tampoco entiendo por qué se está guardando el currency en donde se guardan los tokens en lugar de como se hace en la función updateCurreny.
                setAuth(setcurrency.access_token);
            } else setAuth(setcurrency.access_token);
        } catch (error) {
            //TODO: Sería bueno manejar el error de alguna manera. 
        }
    };

    const providerValue: TodoContextType = {
        session: userSession,
        setSession: setuserSession,
        access_token: auth,
        winProducts: products,
        disconnectUser: disconnectSession,
        refreshSession: autoConnectSession,
        homeData: homeData,
        winBrokers: undefined,
    };

    return (
        <SessionContext.Provider value={providerValue}>
            <Header />
            <main>{children}</main>
            <Footer />
        </SessionContext.Provider>
    );
};


