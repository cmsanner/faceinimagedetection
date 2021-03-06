import React from 'react';

// make onClick a function that calls onRouteChange, otherwise this becomes an endless loop!
//make this a class because we need to have state, change onRouteChange -> this.props.onRouteChange or use destructuring as the first line
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logInEmail: '',
            logInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({logInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({logInPassword: event.target.value})
    }

    onSubmitLogIn = () => {
        fetch('http://localhost:3000/login',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.logInEmail,
                password: this.state.logInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            // if (user === 'success' ){
            console.log('user.id: ', user.id);
            console.log('user: ', user );
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }else{
                alert('invalid name password, do you need to register?')
            }
        })
    }

    render(){
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email"  id="email" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" name="password"  id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" value="Sign in" onClick={this.onSubmitLogIn}/>
                        </div>
                        <div className="lh-copy mt3">
                        <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                    
                        </div>
                    </div>
                </main>
            </article>
        )
    }
 
}


export default Login
