import React from 'react';
// Fix: Changed import from 'Step' to 'Phase' as 'Step' type does not exist.
import { Phase } from '../types';

interface ProtocolStepProps {
  // Fix: Changed 'step' prop type from 'Step' to 'Phase' and added a separate 'completed' prop
  // to align with how other components in the application handle state.
  step: Phase;
  completed: boolean;
  onToggleComplete: (id: number) => void;
}

const CheckIcon: React.FC<{ completed: boolean }> = ({ completed }) => (
  <div
    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${
      completed ? 'bg-rose-500 border-rose-500' : 'bg-white border-gray-300'
    }`}
  >
    <svg className={`w-5 h-5 text-white ${completed ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

// Fix: Updated component signature to accept 'completed' prop.
const ProtocolStep: React.FC<ProtocolStepProps> = ({ step, completed, onToggleComplete }) => {
  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
        // Fix: Use 'completed' prop instead of 'step.completed'.
        completed ? 'border-rose-200 bg-rose-50/50' : 'border-gray-200 bg-white'
      }`}
    >
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <div className="flex items-center space-x-4">
             <div onClick={(e) => { e.preventDefault(); onToggleComplete(step.id); }} className="cursor-pointer">
                {/* Fix: Use 'completed' prop instead of 'step.completed'. */}
                <CheckIcon completed={completed} />
             </div>
            <h3 className={`text-lg font-bold transition-colors duration-300 ${
                // Fix: Use 'completed' prop instead of 'step.completed'.
                completed ? 'text-gray-400 line-through' : 'text-gray-700'
            }`}>
              {step.title}
            </h3>
          </div>
          <div className="transition-transform duration-300 group-open:rotate-180">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>
        <div className="mt-4 pl-12">
          {step.content}
        </div>
      </details>
    </div>
  );
};

export default ProtocolStep;
