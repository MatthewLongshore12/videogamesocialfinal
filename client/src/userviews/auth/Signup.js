import React from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"


function Signup({ onLogin, setUser }) {

    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup
        .string()
        .required('required'),
        email: yup
        .string()
        .email("Invalid email")
        .required('required'),
        password: yup
        .string()
        .required('required')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
        first_name: yup
        .string()
        .required('required'),
        last_name: yup
        .string()
        .required('required'),
        dob: yup
        .string()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
        .required('required'),
        profile_picture: yup
        .string()
        .required('required')
    })

    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        dob: "",
        profile_picture: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
            navigate('/login')
        },
    });

    // const [show, setShow] = useState(false)

    // const handleShow = () => {
    //     setShow(!show)
    // }


    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <div>
                    <h2>Sign Up</h2>
                </div>

                <label htmlFor="username">Username</label>
                <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                // value={formik.values.username}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.username}</p>

                <label htmlFor="email">Email Address</label>
                <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                // value={formik.values.email}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.email}</p>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        // value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="current-password"
                    />
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                </div>

                <label htmlFor="first_name">First Name</label>
                <input
                type="text"
                name="first_name"
                id="first_name"
                // value={formik.values.first_name}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.first_name}</p>

                <label htmlFor="last_name">Last Name</label>
                <input
                type="text"
                name="last_name"
                id="last_name"
                // value={formik.values.last_name}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.last_name}</p>

                <label htmlFor="dob">Date of Birth(mm/dd/yyyy)</label>
                <input
                type="text"
                id="dob"
                name="dob"
                placeholder={formik.values.dob}
                // value={formik.values.dob}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.dob}</p>

                <label htmlFor="profile_picture">Profile Picture</label>
                <input
                type="text"
                name="profile_picture"
                id="profile_picture"
                // value={formik.values.profile_picture}
                onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}> {formik.errors.profile_picture}</p>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;