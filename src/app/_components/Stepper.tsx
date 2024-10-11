interface StepperProps {
    currentStep: number;
    steps: {
        label: string;
    }[]
}
export default function Stepper(props: StepperProps) {
    return (
        <ul className="w-full flex flex-row gap-x-2 mb-16 justify-between ml-16">
            {props.steps.map((step, index) => (
                <li className="flex items-center gap-x-2 flex-1 group" key={`stepper-step-${index}-${step.label}`}>
                    <div className="min-w-7 min-h-7 inline-flex justify-center items-center text-xs align-middle">
                    <span className={`size-7 flex justify-center items-center shrink-0 p-3 font-medium rounded-full ${index + 1 <= props.currentStep ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'}`}>
                        {index + 1}
                    </span>
                    <span className="ms-2 block text-sm font-medium text-gray-800">
                        {step.label}
                    </span>
                    </div>
                    <div className="w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
                </li>
            ))}
            
        </ul>
    )
}