"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/** @class ScriptLoader
 * @description This a react component is intended to be a drop-in replacement for the <script> html native tag. After you add it in any location of your react-app, the component will take care on appending, the corresponding script tag to your app's document. It supports all the native attributes as well.
 * @example ```<ScriptLoader src="https://www.google.com/recaptcha/api.js" />```
 */
class ScriptTag extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            delayMs: props.delayMs || 0,
            src: props.src,
            timeout: null,
            render: props.render || null,
            id: props.id || null,
            renderScript: props.renderScript || false,
            updated: false,
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
        this.log("componentDidMount started", "color: #ff0000; font-weight: bold;", 2);
        this.setState({
            timeout: setTimeout(this._appendScript, this.state.delayMs),
        });
        this.log("componentDidMount exiting", "color: #ff0000; font-weight: bold;", 2);
    }
    log(msg, style, indent) {
        if (this.props.debug) {
            const indentStr = indent ? " ".repeat(indent) : "";
            console.log(`%c ScriptLoader debug {src: "${this.state.src}"}`, style || `color: #00ff00; font-weight: bold;`);
            console.log(`%c ${indentStr} ${msg}`, style || `color: #00ff00; font-weight: bold;`);
        }
    }
    componentDidUpdate() {
        this.log("componentDidUpdate started", "color: #ff0000; font-weight: bold;", 2);
        if (this.state.updated == false) {
            this.setState({
                updated: true,
            });
            this.onSuccess();
        }
        this.log("componentDidUpdate exiting", "color: #ff0000; font-weight: bold;", 2);
    }
    componentWillUnmount() {
        this.log("componentWillUnmount started", "color: #ff0000; font-weight: bold;", 2);
        if (this.state.timeout) {
            this.log("Clearing Timeout...", "color: #ff0000; font-weight: medium;", 4);
            clearTimeout(this.state.timeout);
        }
        this.log("componentWillUnmount exiting", "color: #ff0000; font-weight: bold;", 2);
    }
    _appendScript = () => {
        this.log("_appendScript started", "color: #ff0000; font-weight: bold;", 2);
        const { delayMs, src, id } = this.state;
        const script = document.createElement("script");
        script.src = src;
        if (this.state.id) {
            script.id = this.state.id;
        }
        const scriptPropKeys = Object.keys(this.state);
        const otherPropsKeys = Object.keys(this.props).filter((prop) => !scriptPropKeys.includes(prop));
        script.setAttribute("data-delayMs", delayMs.toString());
        // Add custom attributes
        if (otherPropsKeys.length > 0) {
            for (const [attr, value] of Object.entries(this.props)) {
                if (scriptPropKeys.includes(attr)) {
                    continue;
                }
                script.setAttribute(attr, value);
            }
        }
        script.onload = this.onLoad;
        script.onerror = this.onError;
        document.body.appendChild(script);
        this.onCreate();
        this.log("_appendScript exiting", "color: #ff0000; font-weight: bold;", 2);
    };
    onError(e) {
        const { onError } = this.props;
        this.log(`onerror started... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
        if (onError) {
            onError(e);
        }
        this.log(`onerror exiting... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
    }
    onSuccess(e) {
        const { onSuccess } = this.props;
        this.log(`onsuccess started... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
        if (onSuccess) {
            onSuccess();
        }
        this.log(`onsuccess exiting... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
    }
    onLoad(e) {
        const customOnLoad = this.props.onLoad;
        this.log(`onload started... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
        if (e) {
            this.log(`onload event: ${JSON.stringify(e, null, 2)}`, "color: #ff0000; font-weight: bold;", 4);
        }
        if (customOnLoad) {
            customOnLoad(e);
        }
        this.log(`onload exiting... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
    }
    onCreate(e) {
        const { onLoad } = this.props;
        this.log(`oncreate started... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
        if (e) {
            this.log(`oncreate event: ${JSON.stringify(e, null, 2)}`, "color: #ff0000; font-weight: bold;", 4);
        }
        if (onLoad) {
            onLoad(e);
        }
        this.log(`oncreate exiting... for { src: "${this.state.src}" }`, "color: #ff0000; font-weight: bold;", 2);
    }
    render() {
        const { updated, render } = this.state;
        this.log(`render called, { src: ${this.state.src}}`, "color: #ff0000; font-weight: bold;", 2);
        return updated && render ? render : null;
    }
}
exports.default = ScriptTag;
