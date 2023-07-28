'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const User = () => {
  return (
    <Link
      href="/"
      onClick={() => {
        signOut();
        toast.success('You have been signed out!');
      }}
    >
      Sign out
    </Link>
  );
};

export default User;
