import { Component } from 'react';
import PropTypes from 'prop-types';

class ScriptLoader extends Component {
    
    constructor() {
        super();
        this.timeout = null;
    }
    
    componentDidMount() {
        const createScript = this._createScript.bind(this);
        this.timeout = setTimeout(createScript, this.props.delayMs);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    _createScript() {
        const { 
            onCreate, 
            onError,
            onSuccess, 
            src, 
        } = this.props;

        onCreate();
        
        // TODO: waiting for microbundle to switch to babel
        // so we can use the spread operator (...)
        const otherProps = {};

        const script = document.createElement('script');
        script.src = src;

        // Add custom attributes
        for (const [attr, value] of Object.entries(otherProps)) {
            script.setAttribute(attr, value);
        }

        script.onload = onSuccess;
        script.onError = onError;
        document.body.appendChild(script);
    };

    render() {
        return null;
    }
}

ScriptLoader.defaultProps = {
    delayMs: 0,
    onCreate: Function.prototype,
    onError: e => {
        throw new URIError(`The script ${e.target.src} is not accessible`);
    },
    onSuccess: Function.prototype
};

ScriptLoader.propTypes = {
    delay: PropTypes.number,
    onCreate: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    src: PropTypes.string.isRequired
};

export default ScriptLoader;

