    export const ESSDAISTATICFIELDS = {
        
        constitutionalDomain : {
            caption : 'Constitutional Domain',
            weighting:3,
            weightingArray: [0,1,2],
            weightingDetail : {
                heading :'Please be careful of not rating constitutional symptoms not related to the disease (such as fever of infectious origin, voluntary weight loss)',
                details :[
                    {
                        heading:'No Activity',
                        description:'Absence of the following symptoms',
                        weightingValue: 0
                    },
                    {
                        heading:'Low Activity',
                        description:'Mild or intermittent fever (37.5°-38.5°C) / night sweats  Involuntary weight loss of 5 to 10% of body weight',
                        weightingValue: 1
                    },
                    {
                        heading:'Moderate Activity',
                        description:'Severe Fever (>38.5°C) / night sweats Involuntary weight loss of >10% of body weight',
                        weightingValue: 2
                    }
                ]
            }
        },

        lymphadenopathyDomain : {
            caption : 'Lymphadenopathy Domain',
            weighting:4,
            weightingArray: [0,1,2,3],
            weightingDetail : {
                heading :'',
                details :[
                    {
                        heading:'No Activity',
                        description:'Absence of the following features',
                        weightingValue: 0
                    },
                    {
                        heading:'Low Activity',
                        description:'Lymphadenopathy ≥ 1cm in any nodal region or ≥ 2cm in inguinal region',
                        weightingValue: 1
                    },
                    {
                        heading:'Moderate Activity',
                        description:'Lymphadenopathy ≥ 2cm in any nodal region or ≥ 3cm in inguinal region, or splenomegaly (clinically palpable or assessed by imaging)',
                        weightingValue: 2
                    },
                    {
                        heading:'High Activity',
                        description:'Current malignant B-cell proliferative disorder',
                        weightingValue: 3
                    }
                ]
            }
        },
        
        glandularDomain : {
            caption : 'Glandular domain',
            weighting:2,
            weightingArray: [0,1,2],
            weightingDetail : {
                heading :'Please be careful of not rating glandular swelling not related to the disease (such as stone or infection)',
                    details :[
                        {
                            heading:'No Activity',
                            description:'Absence of glandular swelling',
                            weightingValue: 0
                        },
                        {
                            heading:'Low Activity',
                            description:'Small glandular swelling with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">enlarged parotid (≤ 3cm),<\li><li class="essdai-domain-detail-list-group-item">or limited submandibular or lachrymal swelling<\li></ul>',
                            weightingValue: 1
                        },
                        {
                            heading:'Moderate Activity',
                            description:'Major glandular swelling with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">enlarged parotid (>3cm )</li><li class="essdai-domain-detail-list-group-item">or important submandibular or lachrymal swelling</li></ul>',
                            weightingValue: 2
                        }
                    ]
            }
        },
        
        articularDomain : {
            caption : 'Articular domain',
            weighting:2,
            weightingArray: [0,1,2,3],
            weightingDetail : {
                heading :'Please be careful of not rating articular involvement not related to the disease, such as osteoarthritis',
                    details :[
                        {
                            heading:'No Activity',
                            description:'Absence of currently active articular involvement',
                            weightingValue: 0
                        },
                        {
                            heading:'Low Activity',
                            description:'Arthralgias in hands, wrists, ankles and feet accompanied by morning stiffness (>30 min)',
                            weightingValue: 1
                        },
                        {
                            heading:'Moderate Activity',
                            description:'1 to 5 synovitis among a 28 count',
                            weightingValue: 2
                        },
                        {
                            heading:'High Activity',
                            description:'≥ 6 synovitis among a 28 count',
                            weightingValue: 3
                        }
                    ]
            }
        },
        
        cutaneousDomain : {
            caption : 'Cutaneous domain',
            weighting:3,
            weightingArray: [0,1,2,3],
            weightingDetail : {
                heading :'Please be careful of rating as “No activity” stable long lasting features that are related to damage rather than disease activity, or cutaneous involvement not related to the disease',
                    details :[
                        {
                            heading:'No Activity',
                            description:'Absence of currently active cutaneous involvement',
                            weightingValue: 0
                        },
                        {
                            heading:'Low Activity',
                            description:'Erythema multiforme',
                            weightingValue: 1
                        },
                        {
                            heading:'Moderate Activity',
                            description:'Limited cutaneous vasculitis, including<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">urticarial vasculitis,</li><li class="essdai-domain-detail-list-group-item">or purpura limited to feet and ankle,</li><li class="essdai-domain-detail-list-group-item">or subacute cutaneous lupus</li></ul>',
                            weightingValue: 2
                        },
                        {
                            heading:'High Activity',
                            description:'Diffuse cutaneous vasculitis, including<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">urticarial vasculitis,</li><li class="essdai-domain-detail-list-group-item">or diffuse purpura or ulcers related to vasculitis</li></ul>',
                            weightingValue: 3
                        }
                    ]
            }
        },
        
        respiratoryDomain : {
            caption : 'Respiratory domain',
            weighting:5,
            weightingArray: [0,1,2,3],
            weightingDetail : {
                heading :'Please be careful of rating as “No activity” stable long lasting features that are related to damage rather than disease activity, or respiratory involvement not related to the disease, (tobacco…)',
                    details :[
                        {
                            heading:'No Activity',
                            description:'Absence of currently active pulmonary involvement',
                            weightingValue: 0
                        },
                        {
                            heading:'Low Activity',
                            description:'Persistent cough or bronchial involvement with no radiographic abnormalities on X-ray</br> Or radiological or HRCT evidence of interstitial lung disease with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">No breathlessness and normal lung function test.</li></ul>',
                            weightingValue: 1
                        },
                        {
                            heading:'Moderate Activity',
                            description:'Moderately active pulmonary involvement, such as Interstitial lung disease proven by HRCT with<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">shortness of breath on exercise (NHYA II)</li><li class="essdai-domain-detail-list-group-item">or abnormal lung function tests restricted to:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">70% >DLCO ≥ 40% and/or 80% > FVC ≥ 60%</li></ul></li></ul>',
                            weightingValue: 2
                        },
                        {
                            heading:'High Activity',
                            description:'Highly active pulmonary involvement, such as Interstitial lung disease proven by HRCT with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">shortness of breath at rest (NHYA III, IV)</li><li class="essdai-domain-detail-list-group-item">or with abnormal lung function tests:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">DLCO < 40% and/or FVC < 60%</li></ul></ul>',
                            weightingValue: 3
                        }
                    ]
            }
        },

        
                muscularDomain : {
                    caption : 'Muscular domain',
                    weighting:6,
                    weightingArray: [0,1,2,3],
                    weightingDetail : {
                        heading :'Please be careful of not rating muscular involvement not related to the disease, such as weakness due to corticosteroids…',
                            details :[
                                {
                                    heading:'No Activity',
                                    description:'Absence of currently active muscular involvement',
                                    weightingValue: 0
                                },
                                {
                                    heading:'Low Activity',
                                    description:'Active myositis proven by abnormal EMG or biopsy with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">no weakness and creatine kinase (N <CK ≤ 2N)</li></ul>',
                                    weightingValue: 1
                                },
                                {
                                    heading:'Moderate Activity',
                                    description:'Moderately active myositis proven by abnormal EMG or biopsy with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">weakness (maximal deficit of 4/5),</li><li class="essdai-domain-detail-list-group-item">or elevated creatine kinase (2N < CK ≤ 4N)</li></ul>',
                                    weightingValue: 2
                                },
                                {
                                    heading:'High Activity',
                                    description:'Highly active myositis proven by abnormal EMG or biopsy with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">weakness (deficit ≤ 3/5)</li><li class="essdai-domain-detail-list-group-item">or elevated creatine kinase (>4N)</li>',
                                    weightingValue: 3
                                }
                            ]
                    }
                },


                peripheralNervousSystemDomain : {
                    caption : 'Peripheral Nervous System domain',
                    weighting:5,
                    weightingArray: [0,1,2,3],
                    weightingDetail : {
                        heading :'Please be careful of rating as “No activity” stable long lasting features that are related to damage rather than activity, or PNS involvement not related to the disease',
                            details :[
                                {
                                    heading:'No Activity',
                                    description:'Absence of currently active PNS involvement',
                                    weightingValue: 0
                                },
                                {
                                    heading:'Low Activity',
                                    description:'Evidence of active peripheral nervous system involvement, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Pure sensory axonal polyneuropathy proven by NCTs</li><li class="essdai-domain-detail-list-group-item">Trigeminal (V) neuralgia</li></ul>',
                                    weightingValue: 1
                                },
                                {
                                    heading:'Moderate Activity',
                                    description:'Evidence of moderately active peripheral nervous system involvement, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Axonal sensory-motor neuropathy proven by NCTs with no motor deficit</li><li class="essdai-domain-detail-list-group-item">Pure sensory neuropathy with presence of cryoglobulinemic vasculitis</li><li class="essdai-domain-detail-list-group-item">Ganglionopathy with symptoms restricted to mild/moderate ataxia</li><li class="essdai-domain-detail-list-group-item">Inflammatory demyelinating polyneuropathy (CIDP) with mild functional impairment (no motor deficit or mild ataxia)</li><li class="essdai-domain-detail-list-group-item">Cranial nerve involvement of peripheral origin (except trigeminal (V) nerve)</li></ul>',
                                    weightingValue: 2
                                },
                                {
                                    heading:'High Activity',
                                    description:'Evidence of highly active peripheral nervous system involvement, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Axonal sensory-motor neuropathy proven by NCTs with motor deficit ≤ 3/5</li><li class="essdai-domain-detail-list-group-item">Peripheral nerve involvement proved to be due to vasculitis (mononeuritis multiplex…)</li><li class="essdai-domain-detail-list-group-item">Severe ataxia due to ganglionopathy</li><li class="essdai-domain-detail-list-group-item">Inflammatory demyelinating polyneuropathy (CIDP) with severe functional impairment: motor deficit ≤ 3/5 or severe ataxia</li></ul>',
                                    weightingValue: 3
                                }
                            ]
                    }
                },




                centralNervousSystemDomain : {
                    //weightingarray 1 is never used.
                    //but so that the calculation works we need to have it in.
                    caption : 'Central Nervous System domain',
                    weighting:5,
                    weightingArray: [0,1,2,3],
                    weightingDetail : {
                        heading :'Please be careful of rating as “No activity” stable long lasting features that are related to damage rather than disease activity, or CNS involvement not related to the disease',
                            details :[
                                {
                                    heading:'No Activity',
                                    description:'Absence of currently active CNS involvement',
                                    weightingValue: 0
                                },
                               
                                {
                                    heading:'Moderate Activity',
                                    description:'Moderately active CNS features, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">cranial nerve involvement of central origin</li><li class="essdai-domain-detail-list-group-item">optic neuritis</li><li class="essdai-domain-detail-list-group-item">multiple sclerosis-like syndrome with symptoms restricted to pure sensory impairment or proven cognitive impairment</li></ul>',
                                    weightingValue: 2
                                },
                                {
                                    heading:'High Activity',
                                    description:'Highly active CNS features, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Cerebral vasculitis with  cerebrovascular accident or transient ischemic attack</li><li class="essdai-domain-detail-list-group-item">seizures</li><li class="essdai-domain-detail-list-group-item">transverse myelitis.</li><li class="essdai-domain-detail-list-group-item">lymphocytic meningitis</li><li class="essdai-domain-detail-list-group-item">multiple sclerosis-like syndrome with motor deficit</li></ul>',
                                    weightingValue: 3
                                }
                            ]
                    }
                },

                                    
                                    
                            haematologicalDomain : {
                                            caption : 'Haematological domain',
                                            weighting:2,
                                            weightingArray: [0,1,2,3],
                                            weightingDetail : {
                                                heading :'Please be careful:<ul class="essdai-domain-heading-list-group"><li class="essdai-domain-heading-list-group-item">considering anemia neutropenia and thrombopenia, only auto-immune cytopenia must be considered</li><li class="essdai-domain-heading-list-group-item">not rating cytopenia not related to the disease ( such as vitamin or iron deficiency, drug-induced cytopenia, as for example lymphocytopenia associated with cyclophosphamide)</li></ul>',
                                                details :[
                                                           {
                                                                        heading:'No Activity',
                                                                        description:'Absence of auto-immune cytopeniat',
                                                                        weightingValue: 0
                                                            },
                                                            {
                                                                        heading:'Low Activity',
                                                                        description:'Cytopenia of auto-immune origin with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">neutropenia (1000 < neutrophils < 1500/mm3)</li><li class="essdai-domain-detail-list-group-item">or anemia (10 <  Hb  < 12g/dl)</li><li class="essdai-domain-detail-list-group-item">or thrombocytopenia ( 100.000 < Plt < 150.000/mm3)</li><li class="essdai-domain-detail-list-group-item">or lymphopenia (500<lymphocytes<1000/mm3)</li></ul>',
                                                                        weightingValue: 1
                                                            },
                                                           {
                                                                        heading:'Moderate Activity',
                                                                        description:'Cytopenia of auto-immune origin with:<ul class="essdai-domain-detail-list-group"> <li class="essdai-domain-detail-list-group-item">neutropenia (500 ≤ neutrophils  ≤  1000/mm3),</li><li class="essdai-domain-detail-list-group-item">or anemia (8 ≤ Hb  ≤ 10g/dl)</li><li class="essdai-domain-detail-list-group-item">or thrombocytopenia (50.000 ≤ Plt  ≤ 100.000/mm3)</li><li class="essdai-domain-detail-list-group-item">or lymphopenia (≤500/mm3)</li></ul>',
                                                                        weightingValue: 2
                                                           },
                                                            {
                                                                        heading:'High Activity',
                                                                        description:'Cytopenia of auto-immune origin with:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">neutropenia (neutrophils < 500/mm3),</li><li class="essdai-domain-detail-list-group-item">or anemia (Hb < 8 g/dl)</li><li class="essdai-domain-detail-list-group-item">or thrombocytopenia (Plt < 50.000/mm3)</li></ul>',
                                                                        weightingValue: 3
                                                            }
                                                        ]
                                                }
                                        },

                                        biologicalDomain : {
                                            caption : 'Biological domain',
                                            weighting:1,
                                            weightingArray: [0,1,2],
                                            weightingDetail : {
                                                         heading :'',
                                                         details :[
                                                          {
                                                              heading:'No Activity',
                                                              description:'Absence of any of the following biological feature',
                                                              weightingValue: 0
                                                          },
                                                                  {
                                                                   heading:'Low Activity',
                                                                   description:'<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Clonal component</li><li class="essdai-domain-detail-list-group-item">or hypocomplementemia (low C4 or C3 or CH50)</li><li class="essdai-domain-detail-list-group-item">or hypergammaglobulinemia or IgG level between 16 and 20g/L</li></ul>',
                                                                   weightingValue: 1
                                                                  },
                                                                  {
                                                                    heading:'Moderate Activity',
                                                                    description:'<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">presence of cryoglobulinemia</li><li class="essdai-domain-detail-list-group-item">or hypergammaglobulinemia or high IgG level > 20g/L</li><li class="essdai-domain-detail-list-group-item">or recent onset hypogammaglobulinemia or recent decrease of IgG level (<5g/L)</li></ul>',
                                                                    weightingValue: 2
                                                                }
                                                              ]
                                                      }
                                              },

                                        renalDomain  : {
                                            caption : 'Renal domain',
                                            weighting:5,
                                            weightingArray: [0,1,2,3],
                                            weightingDetail : {
                                                heading :'Please be careful of rating as “No activity” stable long lasting features that are related to damage rather than disease activity, and renal involvement not related to the disease. If biopsy has been performed, please rate activity based on histological features first',
                                                details :[
                                                    {
                                                        heading:'No Activity',
                                                        description:'Absence of currently active renal involvement:<ul class="essdai-domain-detail-list-group"> <li class="essdai-domain-detail-list-group-item">Proteinuria< 0.5g/d, no hematuria, no leucocyturia, no acidosis.</li><li class="essdai-domain-detail-list-group-item">Long lasting stable proteinuria due to damage</li></ul>',
                                                        weightingValue: 0
                                                        },
                                                          
                                                            {
                                                                        heading:'Low Activity',
                                                                        description:'Evidence of specific active renal involvement, limited to:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Tubular acidosis without renal failure (GFR4 ≥60ml/min)</li><li class="essdai-domain-detail-list-group-item>Glomerular involvement<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">with proteinuria (between 0.5 and 1 g/d)</li><li class="essdai-domain-detail-list-group-item">without hematuria or renal failure (GFR4 ≥60ml/min)</li></ul></li></ul>',
                                                                        weightingValue: 1
                                                            },
                                                           {
                                                                        heading:'Moderate Activity',
                                                                        description:'Moderately active renal involvement, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Tubular acidosis with renal failure (GFR4 < 60 ml/min)<\li><li class="essdai-domain-detail-list-group-item">Glomerular involvement<ul><li class="essdai-domain-detail-list-group-item">with proteinuria  between 1 and 1.5g/d</li><li class="essdai-domain-detail-list-group-item">without hematuria or renal failure (GFR4 ≥ 60ml/min)</li></ul></li><li class="essdai-domain-detail-list-group-item">or histological evidence of<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Extra-membranous glomerulonephritis</li><li class="essdai-domain-detail-list-group-item">Important interstitial lymphoid infiltrate</li></ul></li></ul>',
                                                                        weightingValue: 2
                                                           },
                                                           {
                                                                       heading:'High Activity',
                                                                       description:'Highly active renal involvement, such as:<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">Glomerular involvement<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">with proteinuria > 1.5 g/d</li><li class="essdai-domain-detail-list-group-item">or hematuria</li><li class="essdai-domain-detail-list-group-item">or renal failure (GFR4 < 60 ml/min)</li></ul></li><li class="essdai-domain-detail-list-group-item">or histological evidence of<ul class="essdai-domain-detail-list-group"><li class="essdai-domain-detail-list-group-item">proliferative glomerulonephritis</li><li class="essdai-domain-detail-list-group-item">cryoglobulinemia related renal involvement</li></ul></li></ul>',
                                                                       weightingValue: 3
                                                           }
                                                        ]
                                                }
                                        },
                                        
                                       



        /*end */
    }