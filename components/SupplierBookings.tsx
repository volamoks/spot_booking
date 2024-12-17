import { useAuth } from '@/components/AuthProvider';

const MyComponent = () => {
  const { user } = useAuth();

  if (user?.role !== 'supplier') {
    // Handle unauthorized access
  }

  // ... rest of the component logic
};

export default MyComponent;

