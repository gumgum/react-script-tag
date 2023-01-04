import React from 'react';

/** @class ScriptLoader
 * @description This a react component is intended to be a drop-in replacement for the <script> html native tag. After you add it in any location of your react-app, the component will take care on appending, the corresponding script tag to your app's document. It supports all the native attributes as well.
 * @example ```<ScriptLoader src="https://www.google.com/recaptcha/api.js" />```
*/
export default class ScriptTag extends React.Component<ScriptLoaderProps, {
    delayMs: number;
    src: string;
    timeout: NodeJS.Timeout | null;
    render: JSX.Element | null;
    id: string | null;
    renderScript: boolean;
    updated: boolean;
}> {
 

    constructor(props: ScriptLoaderProps) {


        super(props);

        this.state = {
            delayMs: props.delayMs || 0,
            src: props.src,
            timeout: null,
            render: props.render || null,
            id: props.id || null,
            renderScript: props.renderScript || false,
            updated: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this._appendScript = this._appendScript.bind(this);
        this.render = this.render.bind(this);

        this.onCreate = this.onCreate.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
        this.onSuccess = this.onSuccess.bind(this);

    }

    componentDidMount() {
        this.log('componentDidMount started', 'color: #ff0000; font-weight: bold;', 2);

        this.setState({
            timeout: setTimeout(this._appendScript, this.state.delayMs)
        });

        this.log('componentDidMount exiting', 'color: #ff0000; font-weight: bold;', 2);

    }

    log(msg: string, style?: string, indent?: number) {
        
        if (this.props.debug) {
            const indentStr = indent ? ' '.repeat(indent) : '';
            console.log(`%c ScriptLoader debug {src: "${this.state.src}"}`, style || `color: #00ff00; font-weight: bold;`);

            console.log(`%c ${indentStr} ${msg}`, style || `color: #00ff00; font-weight: bold;`);
        }
    }

    componentDidUpdate() {
        this.log('componentDidUpdate started', 'color: #ff0000; font-weight: bold;', 2);
        if(this.state.updated == false) {
            this.setState({
                updated: true
            });
            this.onSuccess();
        }
        this.log('componentDidUpdate exiting', 'color: #ff0000; font-weight: bold;', 2);
    }
    componentWillUnmount() {
        this.log('componentWillUnmount started', 'color: #ff0000; font-weight: bold;', 2);
        if (this.state.timeout) {
            this.log('Clearing Timeout...', 'color: #ff0000; font-weight: medium;', 4);
            clearTimeout(this.state.timeout);
        };
        this.log('componentWillUnmount exiting', 'color: #ff0000; font-weight: bold;', 2);

    }

    _appendScript = () => {

        this.log('_appendScript started', 'color: #ff0000; font-weight: bold;', 2);

        const {
            delayMs,
            src,
            id
        } = this.state;

     

        const script = document.createElement('script');
        script.src = src;

        const scriptPropKeys = Object.keys(this.state);

        const otherPropsKeys = Object.keys(this.props).filter((prop) => !scriptPropKeys.includes(prop));

        // Add custom attributes
        if(otherPropsKeys.length > 0) {

        
        for (const [attr, value] of Object.entries(this.props)) {

            if (scriptPropKeys.includes(attr)) {
                continue;
            }
            script.setAttribute(attr, value as any);
        }
    }

        script.setAttribute('data-delayMs', delayMs.toString());

        if(id) {
            script.setAttribute('id', id);
        }
        
        script.onload = this.onLoad;
        script.onerror = this.onError;
        document.body.appendChild(script);

        this.onCreate();
        

        this.log('_appendScript exiting', 'color: #ff0000; font-weight: bold;', 2);

    };

    onError (e?: Error | Event | string) {
        const {
   
            onError
        
        } = this.props;
        this.log(`onerror started... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
        if(onError) {
            onError(e);
        }
        this.log(`onerror exiting... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }

    onSuccess (e?: Error | Event | string) {
        const {
   
            onSuccess
        
        } = this.props;
        this.log(`onsuccess started... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
        if(onSuccess) {
            onSuccess();
        }
        this.log(`onsuccess exiting... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }

    onLoad (e?:  Event | undefined) {
        const customOnLoad = this.props.onLoad as (e?: Event) => void;
        this.log(`onload started... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);

        if(e) {
            this.log(`onload event: ${JSON.stringify(e, null, 2)}`, 'color: #ff0000; font-weight: bold;', 4)
         }
        if(customOnLoad) {
            customOnLoad(e);
        }
        this.log(`onload exiting... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }

    onCreate (e?:  Event) {
        const {
   
            onLoad
        
        } = this.props;
        this.log(`oncreate started... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);

        if(e) {
           this.log(`oncreate event: ${JSON.stringify(e, null, 2)}`, 'color: #ff0000; font-weight: bold;', 4)
        }

        if(onLoad) {
            onLoad(e);
        }
        this.log(`oncreate exiting... for { src: "${this.state.src}" }`, 'color: #ff0000; font-weight: bold;', 2);
    }

    render() {

        const {
            updated,
            render
        }   = this.state;
        this.log(`render called, { src: ${this.state.src}}`, 'color: #ff0000; font-weight: bold;', 2);

        return updated && render ? render : null;

    }
}

/** @type ScriptLoaderProps This is the type declaration for props that can be passed to the ScriptLoader component, `import { ScriptLoaderProps } from 'react-script-loader-18'`
     * @param src The source of the script to be loaded, e.g. 'https://www.google.com/recaptcha/api.js'
     * @param delayMS Artifically adds a delay in milliseconds after the component mounts, but before the script tag is appended to the document. Useful for scripts that are not necessary early on, and may conflict on the browser's request-limit.
     * @param onCreate A callback function that is called just right after the script tag has been appended to the document.
     * @param onLoad This function is called after the script has been successfully loaded.
     * @param onError This function is called if the script fails to load.
     * @param onSuccess This function is called if the script is loaded successfully.
     * @param render This is an optional JSX.Element that renders.
     * @param debug This is a boolean flag that enables debug mode. It will log to the console the events that are triggered.
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
    onError?: (event?: string | Event | Error, source?: string, lineno?: number, colno?: number, error?: Error) => void;
    onSuccess?: () => void;
    onLoad?: (event?: Event) => void;
    debug?: boolean;
    render?: JSX.Element;
    renderScript?: boolean;
    src: string;
    [key: string]: any;
}






