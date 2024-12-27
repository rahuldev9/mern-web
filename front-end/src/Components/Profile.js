import React, { useState } from 'react';

function Profile() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('user')));
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(
    auth && auth.profileImage ? `http://localhost:4500/${auth.profileImage}` : null
  );
  const [showFileInput, setShowFileInput] = useState(false);

  // Handle file selection and preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl); // Set preview for immediate display
    }
  };

  // Handle profile image upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await fetch(`http://localhost:4500/profile/${auth._id}`, {
        method: 'PUT',
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update the user profile in local storage and state
        const updatedUser = data.user;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuth(updatedUser);

        // Update preview and message
        setPreview(`http://localhost:4500/${updatedUser.profileImage}`);
        setMessage(data.message || 'Profile image updated successfully.');
        setShowFileInput(false); // Hide file input after successful upload
      } else {
        setMessage(data.message || 'Error uploading profile image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setMessage('Error uploading profile image. Please try again.');
    }
  };

  return (
    <div>
      <h1>My Profile</h1>

      {auth ? (
        <div>
          <h3>Name: {auth.name}</h3>
          <h3>Email: {auth.email}</h3>
          <div>
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                style={{
                  height: '100px',
                  width: '100px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <p>No profile image available</p>
            )}
          </div>

          {!showFileInput ? (
            <button
              onClick={() => setShowFileInput(true)}
              style={{ marginTop: '20px' }}
            >
              Change Profile Picture
            </button>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div>
                <button type="submit" style={{ marginTop: '10px' }}>
                  Update Profile Image
                </button>
              </div>
              {message && <p>{message}</p>}
            </form>
          )}
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}

export default Profile;
