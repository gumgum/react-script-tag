/// <reference types="node" />
import React from 'react';

/** @class ScriptLoader
 * @description This a react component is intended to be a drop-in replacement for the <script> html native tag. After you add it in any location of your react-app, the component will take care on appending, the corresponding script tag to your app's document. It supports all the native attributes as well.
 * @example ```<ScriptLoader src="https://www.google.com/recaptcha/api.js" />```
 */
declare class ScriptTag extends React.Component<ScriptLoaderProps, {
    delayMs: number;
    src: string;
    timeout: NodeJS.Timeout | null;
    render: JSX.Element | null;
    id: string | null;
    renderScript: boolean;
    updated: boolean;
}> {
    constructor(props: ScriptLoaderProps);
    componentDidMount(): void;
    log(msg: string, style?: string, indent?: number): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    _appendScript: () => void;
    onError(e?: Error | Event | string): void;
    onSuccess(e?: Error | Event | string): void;
    onLoad(e?: Event | undefined): void;
    onCreate(e?: Event): void;
    render(): JSX.Element | null;
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
type ScriptLoaderProps = {
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
};

export { ScriptLoaderProps, ScriptTag as default };
