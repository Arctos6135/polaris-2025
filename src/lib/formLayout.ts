import type { Form, FormType } from "./types";

export const ScoutingForm: Form = {
    sections: [
        {
            type: "section",
            id: "Auto",
            header: "Auto",
            inputs: [
                {
                    type: "input",
                    label: "Score L1",
                    tooltip: "Did they score in L1 (trough) during the autonomous period",
                    component: {
                        type: "Checkbox",
                        id: "auto score L1"
                    }
                },
                {
                    type: "input",
                    label: "Score L2",
                    tooltip: "Did they score on L2 during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto score L2"
                    } 
                },
                {
                    type: "input",
                    label: "Score L3",
                    tooltip: "Did they score on L3 during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto score L3"
                    } 
                },
                {
                    type: "input",
                    label: "Score L4",
                    tooltip: "Did they score on L4 during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto score L4"
                    } 
                },
                {
                    type: "input",
                    label: "Score Processor",
                    tooltip: "Did they score algae in the processor during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto processor"
                    } 
                },
                {
                    type: "input",
                    label: "Score Net",
                    tooltip: "Did the robot score algae in the net during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto net"
                    }
                    
                },
                {
                    type: "input",
                    label: "Leave",
                    tooltip: "Did the robot move off the starting line during auto",
                    component: {
                        type: "Checkbox",
                        id: "auto leave"
                    }
                    
                }
            ]
        },
        {
            type: "section",
            id: "Teleop",
            header: "Teleop",
            inputs: [
                {
                    type: "input",
                    label: "Score L1",
                    tooltip: "Did they score in L1 (trough) during the teleoperated period",
                    component: {
                        type: "Checkbox",
                        id: "score L1"
                    }
                },
                {
                    type: "input",
                    label: "Score L2",
                    tooltip: "Did they score on L2 during teleop",
                    component: {
                        type: "Checkbox",
                        id: "score L2"
                    } 
                },
                {
                    type: "input",
                    label: "Score L3",
                    tooltip: "Did they score on L3 during teleop",
                    component: {
                        type: "Checkbox",
                        id: "score L3"
                    } 
                },
                {
                    type: "input",
                    label: "Score L4",
                    tooltip: "Did they score on L4 during teleop",
                    component: {
                        type: "Checkbox",
                        id: "score L4"
                    } 
                },
                {
                    type: "input",
                    label: "Dealgaeification",
                    tooltip: "Did the robot remove algae from the reef",
                    component: {
                        type: "Checkbox",
                        id: "dealgaeification"
                        
                    }
                },
                {
                    type: "input",
                    label: "Score Processor",
                    tooltip: "Did they score algae in the processor during teleop",
                    component: {
                        type: "Checkbox",
                        id: "processor"
                    } 
                },
                {
                    type: "input",
                    label: "Score Net",
                    tooltip: "Did the robot score algae in the net during teleop",
                    component: {
                        type: "Checkbox",
                        id: "net"
                    }
                    
                },
                {
                    type: "input",
                    label: "Defense",
                    tooltip: "Did the robot play defense during the match?",
                    component: {
                        type: "Checkbox",
                        id: "defense",
                    }
                },
                {
                    type: "input",
                    label: "Driving",
                    tooltip: "How was the driving? (did they get in the way, jerky movement)",
                    component: {
                        type: "Textbox",
                        id: "driving",                        
                    }
                },
                {
                    type: "input",
                    label: "Quality of Intaking",
                    tooltip: "How fast/efficient was their intake?",
                    component: {
                        type: "Textbox",
                        id: "intake",
                    }
                },
                {
                    type: "input",
                    label: "Scoring Precision",
                    tooltip: "How precise was their scoring? Did they miss a lot, drop pieces, struggle with certain levels?",
                    component: {
                        type: "Textbox",
                        id: "precision",
                    }
                },
                {
                    type: "input",
                    label: "Issues",
                    tooltip: "Did they encounter any problems? (game piece got stuck, stopped moving, something fell off etc.)",
                    component: {
                        type: "Textbox",
                        id: "issues",
                    }
                },
            ]
        },
        {
            type: "section",
            id: "endgame",
            header: "Endgame",
            inputs:
            [
                {
                    type: "input",
                    label: "Endgame",
                    tooltip: "What did they do in the last 30 seconds of the match",
                    component: {
                        type: "Dropdown",
                        id: "endgame",
                        options: ["Deep Climb", "Shallow Climb", "Park", "None"],
                        validator: (choice: string) => undefined
                    }
                },
            ]
        },
        {
            type: "section",
            id: "other",
            header: "Other",
            inputs:
            [
                {
                    type: "input",
                    label: "Other Comments",
                    tooltip: "Any information that doesn't go in one of the above sections",
                    component: {
                        type: "Textbox",
                        id: "comments"
                    }
                },
                {
                    type: "input",
                    label: "Fouls",
                    tooltip: "Try to track how many fouls the team gets and for what",
                    component: {
                        type: "Textbox",
                        id: "fouls"
                    }
                },
            ]
        }

    ]
}

// Add ground/station intake
export const PitScoutingForm: Form = {
    sections: [
        {
            type: "section",
            id: "scoring",
            header: "Scoring",
            inputs: [
                {
                    type: "input",
                    label: "Can score L1? (trough)",
                    component: {
                        type: "Dropdown",
                        id: "l1 scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score L2?",
                    component: {
                        type: "Dropdown",
                        id: "l2 scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score L3?",
                    component: {
                        type: "Dropdown",
                        id: "l3 scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score L4?",
                    component: {
                        type: "Dropdown",
                        id: "l4 scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score net?",
                    component: {
                        type: "Dropdown",
                        id: "net scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can score processor?",
                    component: {
                        type: "Dropdown",
                        id: "processor scoring",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Can dealgaeify?",
                    component: {
                        type: "Dropdown",
                        id: "ps dealgaeification",
                        options: ["Yes", "Maybe", "No"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                }
            ]
        },
        {
            type: "section",
            id: "robot info",
            header: "Robot Information",
            inputs: [
                {
                    type: "input",
                    label: "Deep climb?",
                    component: {
                        type: "Checkbox",
                        id: "deep climb",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Shallow climb?",
                    component: {
                        type: "Checkbox",
                        id: "shallow climb",
                        initialValue: 0
                    }
                },
                {
                    type: "input",
                    label: "Drivetrain",
                    component: {
                        type: "Dropdown",
                        id: "drivetrain",
                        options: ["Tank", "Swerve", "Other"],
                        manual: false,
                        validator: (choice: string) => undefined
                    }
                },
                {
                    type: "input",
                    label: "Weight (lbs)",
                    component: {
                        type: "Counter",
                        id: "weight",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Length (front to back, inches)",
                    component: {
                        type: "Counter",
                        id: "length",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Width (side to side, inches)",
                    component: {
                        type: "Counter",
                        id: "width",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Intake",
                    component: {
                        type: "Dropdown",
                        id: "intake type",
                        options: ["Ground", "Station", "Both"],
                        validator: (choice: String) => undefined
                    }

                },
                {
                    type: "input",
                    label: "Starting Height (inches)",
                    component: {
                        type: "Counter",
                        id: "retracted height",
                        initialValue: 0,
                        hasButtons: false
                    }
                },
                {
                    type: "input",
                    label: "Maximum Height (inches)",
                    component: {
                        type: "Counter",
                        id: "extended height",
                        initialValue: 0,
                        hasButtons: false
                    }
                }
            ]
        },
        {
            type: "section",
            id: "other",
            header: "Other",
            inputs: [
                {
                    type: "input",
                    label: "Autos comments",
                    tooltip: "What autos do they have, how consistently they work, other info",
                    component: {
                        type: "Textbox",
                        id: "auto comments",
                        maxLength: 200
                    }
                },
                {
                    type: "input",
                    label: "General Comments",
                    component: {
                        type: "Textbox",
                        id: "general comments",
                        maxLength: 200
                    }
                },
                {
                    type: "input",
                    label: "Robot's favourite colour",
                    tooltip: "Most important question",
                    component: {
                        type: "Textbox",
                        id: "fave colour",
                        maxLength: 42
                    }
                }
            ]
        }
    ]
}

export const formTypes: FormType[] = [
    {
        name: "Scouting",
        type: ScoutingForm
    },
    {
        name: "Pit Scouting",
        type: PitScoutingForm
    }
]