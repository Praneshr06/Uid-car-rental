import React from 'react';
import UserProfile from '../components/UserProfile';

export default function UserProfilePage() {
  return (
    <section className="intro">
      <h2>User Profile</h2>
      <UserProfile
        name="Alex Johnson"
        email="alex.johnson@example.com"
        avatarUrl={`https://api.dicebear.com/7.x/initials/svg?seed=Alex%20Johnson`}
        membershipTier="Gold"
        joinedOn="2023-04-12"
        totalRentals={18}
        location="San Francisco, CA"
      />
    </section>
  );
}


