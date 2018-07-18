import { Component } from 'react';
import PropTypes from 'prop-types';

class ScriptLoader extends Component {
    
    timeout = null;
    
    componentDidMount() {
        this.timeout = setTimeout(this._createScript, this.props.delayMs);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    _createScript = () => {
        const { 
            onCreate, 
            onError,
            onSuccess, 
            src, 
            ...otherProps 
        } = this.props;

        onCreate();

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

