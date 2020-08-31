import React from "react";

class ProfileStatus extends React.Component<any, any> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
                status: e.currentTarget.value
            }
        )

    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(prevProps !== this.props){
            this.setState({
                status: this.props.status
            })
        }


        console.log('componentDidUpdate')
    }

    render() {


        return <>
            {!this.state.editMode &&
            <div>
                <span onDoubleClick={this.activateEditMode}> status: {this.props.status ||  '---'}</span>
            </div>
            }
            {this.state.editMode &&
            <div>
                <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode} autoFocus={true}
                       value={this.state.status}

                />
            </div>
            }

        </>
    }
}

export default ProfileStatus;