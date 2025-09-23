import React from 'react';

export default function UserProfile({
  name,
  email,
  avatarUrl,
  membershipTier,
  joinedOn,
  totalRentals,
  location,
}) {
  return (
    <div className="profile-card">
      <img className="profile-avatar" src={avatarUrl} alt={`${name} avatar`} />
      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-meta">{email} • {location}</p>
        <div className="profile-badges">
          <span className="badge tier">{membershipTier} Member</span>
          <span className="badge rentals">{totalRentals} rentals</span>
        </div>
        <p className="profile-joined">Joined on {joinedOn}</p>
      </div>
    </div>
  );
}


