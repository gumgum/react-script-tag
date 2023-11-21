import React  from "react";

/** @class ScriptLoader
 * @description a react component is intended to be a drop-in replacement for the <script> html native tag. After you add it in any location of your react-app, the component will take care on appending, the corresponding script tag to your app's document. It supports all the native attributes as well.
 * @example ```<ScriptLoader src="https://www.google.com/recaptcha/api.js" />```
 */
const ScriptTag = (props: ScriptLoaderProps) => {

    //  useEffect(()=>{

    //     console.info('UseEffect called at ScriptTag', props);

    // }, [props]);
    const log = React.useCallback((msg: string, style?: string, indent?: number) => {

        if (props.debug) {
            const indentStr = indent ? ' '.repeat(indent) : '';
            console.log(`%c ScriptLoader debug {src: "${props.src}"}`, style || `color: #00ff00; font-weight: bold;`);

            console.log(`%c ${indentStr} ${msg}`, style || `color: #00ff00; font-weight: bold;`);
        }
    }, [props]);
 
    const [updated, setUpdated] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const scriptRef = React.createRef<HTMLScriptElement>();
    const onError = React.useCallback((e?: Error | Event | string) => {
        const {

            onError

        } = props;
        log(`onerror started... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
        if (onError) {
            onError(e);
        }
        log(`onerror exiting... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }, [props, log]);

    const onSuccess = (e?: Error | Event | string) => {
        const {

            onSuccess

        } = props;
        log(`onsuccess started... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
        if (onSuccess) {
            onSuccess();
        }
        log(`onsuccess exiting... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }

    const onLoad = React.useCallback((e?: Event | undefined) => {
        const customOnLoad = props.onLoad as (e?: Event) => void;
        log(`onload started... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);

        if (e) {
            log(`onload event: ${JSON.stringify(e, null, 2)}`, 'color: #ff0000; font-weight: bold;', 4)
        }
        if (customOnLoad) {
            customOnLoad(e);
        }
        log(`onload exiting... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }, [props, log]);

    const onCreate = React.useCallback((e?: Event) => {
        const {

            onLoad

        } = props;
        log(`oncreate started... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);

        if (e) {
            log(`oncreate event: ${JSON.stringify(e, null, 2)}`, 'color: #ff0000; font-weight: bold;', 4)
        }

        if (onLoad) {
            onLoad(e);
        }
        log(`oncreate exiting... for { src: "${props.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }, [props, log]);




    //unique hash from props 
    const hash = React.useMemo(() => {
        return JSON.stringify(props);
    }
        , [props]);

    console.log("React", React.useEffect);

    React.useEffect(() => {

        const componentDidMount = () => {
            log('componentDidMount started', 'color: #ff0000; font-weight: bold;', 2);
            const _appendScript = () => {

                log('_appendScript started', 'color: #ff0000; font-weight: bold;', 2);

                const {
                    delayMs,
                    src,
                    id
                } = props;



                const script = document.createElement('script');
                script.src = src;



                script.setAttribute('data-ref', hash);
                script.setAttribute('data-delayMs', (delayMs || 0).toString());

                if (id) {
                    script.setAttribute('id', id);
                }

                script.onload = onLoad;
                script.onerror = onError;
                document.body.appendChild(script);

                onCreate();


                log('_appendScript exiting', 'color: #ff0000; font-weight: bold;', 2);

            };
            const timeoutId = setTimeout(_appendScript, props.delayMs || 0);

            setMounted(true);
            log('componentDidMount exiting', 'color: #ff0000; font-weight: bold;', 2);

        }

        const componentDidUpdate = () => {
            log('componentDidUpdate started', 'color: #ff0000; font-weight: bold;', 2);
            if (!updated) {
                setUpdated(true);
            }
            log('componentDidUpdate exiting', 'color: #ff0000; font-weight: bold;', 2);
        }


        if (!mounted) {
            componentDidMount();
        }

        if (mounted && !updated) {
            componentDidUpdate();
        }




    }, [props, updated, log, onError, onLoad, onCreate, mounted, hash]);

    return (
        <script
            ref={scriptRef}
            {...props}
        />
    )

}

/** @type ScriptLoaderProps is the type declaration for props that can be passed to the ScriptLoader component, `import { ScriptLoaderProps } from 'react-script-loader-18'`
 * @param src The source of the script to be loaded, e.g. 'https://www.google.com/recaptcha/api.js'
 * @param delayMS Artifically adds a delay in milliseconds after the component mounts, but before the script tag is appended to the document. Useful for scripts that are not necessary early on, and may conflict on the browser's request-limit.
 * @param onCreate A callback function that is called just right after the script tag has been appended to the document.
 * @param onLoad function is called after the script has been successfully loaded.
 * @param onError function is called if the script fails to load.
 * @param onSuccess function is called if the script is loaded successfully.
 * @param render is an optional JSX.Element that renders.
 * @param debug is a boolean flag that enables debug mode. It will log to the console the events that are triggered.
 * @example ``
 * import { ScriptLoaderProps } from 'react-script-loader-18';
 * const props: ScriptLoaderProps =
 * {
 *   src: 'https://www.google.com/recaptcha/api.js',
 *   delayMs: 1000, onCreate: () => { console.log('Script created!') },
 *   onLoad: (e: Event) => { console.log('Script loaded!') },
 *   onError: (e: Event | string) => { console.log('Script failed to load!') },
 *   onSuccess: () => { console.log('Script loaded successfully!') },
 *   debug: true,
 *   id: JSX.Element tag id,
 *   render: <><style> {`h3:hover {visibility: visible;}`} </style>
 *  <h3 style={{visibility:hidden}}>Script loaded! AMAZON LEGAL,
 *  <a target='_blank' style={{textDecoration: none}} href='https://liu.academy/stakeholder/letter'>WHERE ARE MY WAGES
 *  </a> </h3> </>
 * }
 * ``
 */
export type ScriptLoaderProps = {
    delayMs?: number;
    id?: string;
    onCreate?: (event?: Event) => void;
    onError?: (
        event?: string | Event | Error,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
    ) => void;
    onSuccess?: () => void;
    onLoad?: (event?: Event) => void;
    debug?: boolean;
    render?: JSX.Element;
    renderScript?: boolean;
    src: string;

} & React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;

export default ScriptTag;
