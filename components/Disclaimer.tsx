
import React from 'react';

interface DisclaimerProps {
  text: string;
  level: 'critical' | 'warning';
}

const levelStyles = {
    critical: {
        container: "bg-red-100 border-red-500 text-red-800",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    },
    warning: {
        container: "bg-yellow-100 border-yellow-500 text-yellow-700",
        icon: "M13 16h-1v-4h1v4zm-1-8h1v2h-1V8z"
    }
}

const Disclaimer: React.FC<DisclaimerProps> = ({ text, level }) => {
    const styles = levelStyles[level];
  return (
    <div className={`p-4 rounded-lg border-l-4 flex items-start space-x-3 ${styles.container}`}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.icon} />
      </svg>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};

export default Disclaimer;
