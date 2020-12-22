import React from 'react';
import { ReactComponent as MinimizeIcon } from "../../icons/small.svg";
import { ReactComponent as MaximizeIcon } from "../../icons/plus.svg";
import { ReactComponent as Expand } from "../../icons/expand.svg";

class WindowControls extends React.Component {
    render() {
        return (
            <>
                <MaximizeIcon className="controls-icons" onClick={this.props.handlers.handleMaximize} style={{ display: this.props.windowStates.maximize ? 'inline-block' : 'none' }} />

                <MinimizeIcon className="controls-icons" onClick={this.props.handlers.handleMinimize} style={{ display: this.props.windowStates.minimize ? 'inline-block' : 'none' }} />

                <Expand className="controls-icons" onClick={this.props.handlers.handleFullSize} style={{ display: this.props.windowStates.fullSize ? 'inline-block' : 'none' }} />
            </>
        )
    }
}

export default WindowControls;