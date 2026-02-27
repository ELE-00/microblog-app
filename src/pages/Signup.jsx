//Signup.jsx
import React, {useState} from 'react';
import '../styles/signup.css'
import {signup as signupAPI} from '../api/auth';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.jpg';

const rules = [
    { key: 'length',    label: 'At least 8 characters',          test: (p) => p.length >= 8 },
    { key: 'upper',     label: 'One uppercase letter (A–Z)',      test: (p) => /[A-Z]/.test(p) },
    { key: 'lower',     label: 'One lowercase letter (a–z)',      test: (p) => /[a-z]/.test(p) },
    { key: 'number',    label: 'One number (0–9)',                test: (p) => /[0-9]/.test(p) },
    { key: 'special',   label: 'One special character (!@#$…)',   test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const strengthLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];

function getStrength(password) {
    if (!password) return 0;
    return rules.filter(r => r.test(password)).length;
}

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (getStrength(formData.password) < 5) {
            alert("Please meet all password requirements before submitting.");
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const res = await signupAPI({
                username: formData.username,
                name: formData.name,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm
            });

            console.log(res.data);
            alert("Signup successful! You can now login.");
            navigate(`/login`);

        } catch (err) {
            alert("Username already exists");
            console.log(err);
        }
    };

    const strength = getStrength(formData.password);

    return(
        <div className="signupWrapper">

            <img className="bg" src={background} alt="" />

            <div className="formWrapper">
                <div className="Lheader">
                    <h1>WHISPR</h1>
                    <p>Sign-up</p>
                </div>

            <form className="signupForm" onSubmit={handleSignup}>

                <label className="loginLabel">Username:</label>
                <input className="signupInput" type="text" placeholder="Jack1993" name="username" required value={formData.username} onChange={handleChange} />

                <label className="loginLabel">Name:</label>
                <input className="signupInput" type="text" placeholder="Jack Black" name="name" required value={formData.name} onChange={handleChange} />

                <label className="loginLabel">Password:</label>
                <input className="signupInput" type="password" name="password" required value={formData.password} onChange={handleChange} />

                {formData.password && (
                    <div className="strengthMeter">
                        <div className="strengthBar">
                            {rules.map((_, i) => (
                                <div
                                    key={i}
                                    className="strengthSegment"
                                    style={{ backgroundColor: i < strength ? strengthColors[strength] : 'var(--bg-input)' }}
                                />
                            ))}
                        </div>
                        <span className="strengthLabel" style={{ color: strengthColors[strength] }}>
                            {strengthLabels[strength]}
                        </span>

                        <ul className="requirementsList">
                            {rules.map(r => (
                                <li key={r.key} className={r.test(formData.password) ? 'reqMet' : 'reqUnmet'}>
                                    {r.test(formData.password) ? '✓' : '✗'} {r.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <label className="loginLabel">Confirm Password:</label>
                <input className="signupInput" type="password" name="passwordConfirm" required value={formData.passwordConfirm} onChange={handleChange} />

                <button className="signupBtn" type="submit">Submit</button>

                <p>Already have an account? Log-in <a className="Link" href="/login">here</a></p>
            </form>

            </div>

        </div>
    );
};


export default Signup;
