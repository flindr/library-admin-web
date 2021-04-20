import GoogleLogin from "react-google-login";
import React from "react";

function Login(props) {
    const onSuccess = (response) => {
        console.log(response);
        props.onLogin(response.tokenId);
    };

    return (
        <GoogleLogin
            clientId={
                "935364814037-vc5cj146voc1f14jsqh5tgeqciorq324.apps.googleusercontent.com"
            }
            onSuccess={onSuccess}
        ></GoogleLogin>
    );
}

export default Login;
