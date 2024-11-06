import React, { useContext, useState } from 'react'
import './UserDetails.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify'

function UserDetails() {
    const { user, setUser, url } = useContext(StoreContext);
    console.log('user', user)


    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleformsubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('id', user._id)
        formData.append('name', user.name)
        if (user.newEmail) {
            formData.append('newEmail', user.newEmail)
        }
        if (user.oldPassword && user.newPassword) {
            formData.append('oldPassword', user.oldPassword)
            formData.append('newPassword', user.newPassword)
        }


        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post(url + '/api/user/updateUserDetails', formData,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
            if (response.data.success) {
               
                toast.success(response.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 6000);
                
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error('failed to update the user')
        }

    }

    return (
        <div>
            <div className='main'>
                <div className="head">
                    <p>Personal Details</p>
                </div>
                <form className='personal-details' onSubmit={handleformsubmit}>
                    <div className='data'>


                        <div className='input1'>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    value={user ? user.name : ''}
                                    onChange={handleChange}

                                />
                            </div>
                            <div>
                                <label>Current Email</label>
                                <input
                                    type="email"
                                    name='currentEmail' // Changed variable name to match state
                                    value={user ? user.email : ''}
                                />
                            </div>



                            <div>
                                <p
                                    onClick={() => setChangeEmail(!changeEmail)}
                                    style={{ cursor: 'pointer', color: changeEmail ? 'red' : 'gray',fontSize:'14px' }}
                                >
                                    {changeEmail ? 'X' : 'Change Email?'}

                                </p>
                                {
                                    changeEmail ? (
                                        <div>
                                            <label>New Email</label>
                                            <input
                                                type="email"
                                                name='newEmail' // Changed variable name to match state
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ) :
                                        <></>
                                }

                            </div>
                        </div>


                        <div className="input2">
                            <div className="changepassword">
                                <p
                                    onClick={() => setChangePassword(!changePassword)}
                                    style={{ cursor: 'pointer', color: changePassword ? 'red' : 'gray' }}
                                >
                                    {changePassword ? 'X' : 'Change Password?'}
                                </p>
                            </div>

                            {/* Conditionally render password inputs */}
                            {changePassword && (
                                <div>
                                    <div>
                                        <label>Old Password</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="Enter your old password"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="Enter your new password"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>

                    <div className='submit'>
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserDetails
