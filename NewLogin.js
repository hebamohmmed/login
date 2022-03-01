import React,{useState} from 'react'
import '../newLogin.css'
import * as Icon from 'react-bootstrap-icons';
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import axios from 'axios'


function NewLogin() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );
    const [formValues, setFormValues] = useState({
        Email: "",
        password: "",
        
    });
    
    const [formValuesErrors, setFormValuesErrors] = useState({
        EmailErr: null,
        passwordErr: null,
    });
    
    const handleFormChange = (event) => {
        switch (event.target.name) {
            case "Email":
            setFormValues({
            ...formValues,
            Email: event.target.value,
            });
            setFormValuesErrors({
            ...formValuesErrors,
            EmailErr:
                event.target.value.length === 0
                ? "This field is required"
                :null,
            });
            break;
    
            case "password":
            setFormValues({
            ...formValues,
            password: event.target.value,
            });
            setFormValuesErrors({
                ...formValuesErrors,
                passwordErr:
                event.target.value.length===0
                ?"This field is required"
                :null,
            });
            break;
            default:
            break;
        }
    };
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (
            !formValuesErrors.EmailErr &&
            !formValuesErrors.passwordErr 
        ) {
            axios.post('',({}))
            .then(res => {
            console.log(res);
            console.log(res.data);
        })
        }
    };
    const handleFailure = (result)=>{
        
    }
    const handleLogin = async(googleData)=>{
        const res = await fetch('/api/google-login', {
            method: 'POST',
            body: JSON.stringify({
            token: googleData.tokenId,
            }),
            headers: {
            'Content-Type': 'application/json',
            },});
            const data = await res.json();
            setLoginData(data);
            localStorage.setItem('loginData', JSON.stringify(data));
    };
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };
return (
    <>
    <section onSubmit={(e) =>  handleSubmitForm(e)} class="back-style vh-100" style={{backgroundColor:" #508bfc"}}>
    <div class="container py-5 h-100">
    <   div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong card-style" style={{borderRadius: "1rem"}}>
            <div class="card-body p-5 text-center">
            <h3 class="mb-5 wel-style">Welcome back</h3>
            <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.Send size={30}  position="absolute"/>
                    <div className="form-outline flex-fill mb-0">
                        <input type="email"
                    placeholder="Email"
                    className="form-control "
                    id="EmailInput"
                    aria-describedby="EmailHelp"
                    value={formValues.Email}
                    onChange={(e) => handleFormChange(e)} 
                    name="Email"
                    />
                    {formValuesErrors.EmailErr && (
                <div id="EmailHelp" className="form-text text-danger">
                {formValuesErrors.EmailErr}
                </div>
            )}
                    </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                    <Icon.LockFill size={35}   />
                    <div className="form-outline flex-fill mb-0">
                        <input type="password"
                    placeholder='Password'
                    className="form-control "
                    id="passwordInput"
                    aria-describedby="passwordHelp"
                    value={formValues.position}
                    onChange={(e) => handleFormChange(e)}
                    name="password"
                    />
                    {formValuesErrors.passwordErr && (
                    <div id="passwordHelp" className="form-text text-danger">
                    {formValuesErrors.passwordErr}
                    </div>
                )}
                    </div>
                    </div>
            <button 
            class="btn btn-primary btn-lg btn-block login-style"
            disabled={
                formValuesErrors.EmailErr ||
                formValuesErrors.passwordErr 
            } 
            type="submit">Login Now</button>
            {
                    loginData?(
                    <div>
                        <h3>You logged in as {loginData.email}</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
            ):(
                <GoogleLogin
            clientId='678175724274-mfoptnppuqqf84525pqv0gk173jdl4e8.apps.googleusercontent.com'
            render={renderProps => (
                <GoogleButton style={{width: '100%', backgroundColor: '#F0B27A ',boxShadow: '0 0 0 0.5',marginTop: '20px',color:"white",marginBottom: '30px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
            )}
            className="btn btn-lg btn-primary"
            id="btn"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
            >
            </GoogleLogin>
            )
                }
            </div>
        </div>
        </div>
    </div>
    </div>
</section>
    </>
)
}

export default NewLogin