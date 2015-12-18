angular.module("visit-templates", ["constants", "encounterTypeConfig"])

    .factory("VisitTemplates", [ "EncounterTypes", "EncounterRoles", "EncounterTypeConfig", function(EncounterTypes, EncounterRoles, EncounterTypeConfig) {

        // if use has only "enterConsultNote", must be an active visit; retroConsultNote or retroConsultNoteThisProviderOnly required for retro visits
        var standardConsultNoteRequire = "(user.hasPrivilege('Task: emr.enterConsultNote') && visit && !visit.stopDatetime) || (user.hasPrivilege('Task: emr.retroConsultNote') || user.hasPrivilege('Task: emr.retroConsultNoteThisProviderOnly'))"


        var visitActions = {
            type: "include",
            include: "templates/visitActions.page"
        };

        var reverseChronologicalEncounters = {
            type: "include",
            include: "templates/reverseChronologicalEncounters.page"
        };

        var checkIn = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.checkIn.uuid
                }
            },
            action: {
                label: "Check In",
                icon: "icon-check-in",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithSimpleUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/checkin.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}"
            }
        };

        var vitals = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.vitals.uuid
                }
            },
            action: {
                label: "Vitals",
                icon: "icon-vitals",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithSimpleUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/vitals.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: "visit && !visit.stopDatetime"   // currently our vitals form only works in the context of an active visit
            }
        };

        var reviewAllergies = {
            type: "include",
            include: "templates/reviewAllergies.page"
        };
        var vaccinations = {
            type: "include",
            include: "templates/vaccinations.page"
        };
        var primaryCareHistory = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCareHistory.uuid
                }
            },
            action: {
                label: "History",
                icon: "icon-file-alt",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-history.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };
        var primaryCareExam = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCareExam.uuid
                }
            },
            action: {
                label: "Exam",
                icon: "icon-stethoscope",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithSimpleUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-exam.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };

        var primaryCareDisposition = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCareDisposition.uuid
                }
            },
            action: {
                label: "Disposition",
                icon: "icon-stethoscope",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-disposition.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };

        var feeding = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCarePedsFeeding.uuid
                }
            },
            action: {
                label: "Feeding",
                icon: "icon-food",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-peds-feeding.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };

        var supplements = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCarePedsSupplements.uuid
                }
            },
            action: {
                label: "Supplements",
                icon: "icon-asterisk",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-peds-supplements.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };

        var primaryCareDx = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.primaryCareDx.uuid
                }
            },
            action: {
                label: "Diagnosis",
                icon: "icon-list-ul",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/haiti/primary-care-dx.xml&returnUrl={{returnUrl}}&breadcrumbOverride={{breadcrumbOverride}}",
                require: standardConsultNoteRequire
            }
        };
/*

        var labResults = {
            type: "encounter",
            encounter: {
                encounterType: {
                    uuid: EncounterTypes.labResults.uuid
                },
                longTemplate: "templates/encounters/defaultEncounterLong.page"
            },
            action: {
                label: "Lab results",
                icon: "icon-beaker",
                href: "/{{contextPath}}/htmlformentryui/htmlform/enterHtmlFormWithSimpleUi.page?patientId={{visit.patient.uuid}}&visitId={{visit.uuid}}&definitionUiResource=pihcore:htmlforms/labResults.xml&returnUrl={{returnUrl}}"
            }
        };
*/

        var outpatientPlan = {
            type: "encounter",
            allowMultiple: true,
            encounter: {
                encounterType: EncounterTypes.consultationPlan
            },
            action: {
                label: "Plan",
                icon: "icon-list-ol",
                sref: "editPlan",
                require: standardConsultNoteRequire
            }
        };

        var addExpectedEncounters = {
            type: "include",
            include: "templates/add-expected-encounters.page"
        }

        var allowedForAll = function(visit) {
            return true;
        };

        var ret = {
            timeline: {
                label: "Visit (Generic)",
                encounterTypeConfig: EncounterTypeConfig,
                allowedFor: allowedForAll,
                elements: [
                    visitActions,
                    reverseChronologicalEncounters
                ]
            },

            adultInitialOutpatient: {
                label: "Adult Initial Outpatient Visit",
                allowedFor: allowedForAll,
                encounterTypeConfig: EncounterTypeConfig,
                elements: [
                    addExpectedEncounters,
                    checkIn,
                    vitals,
                    reviewAllergies,
                    primaryCareHistory,
                    primaryCareExam,
                    primaryCareDx,
                    outpatientPlan,
                    primaryCareDisposition
                ]
            },
            adultFollowupOutpatient: {
                label: "Adult Followup Outpatient Visit",
                allowedFor: allowedForAll,
                encounterTypeConfig: EncounterTypeConfig,
                elements: [
                    addExpectedEncounters,
                    checkIn,
                    vitals,
                    primaryCareExam,
                    primaryCareDx,
                    outpatientPlan,
                    primaryCareDisposition
                ]
            },
            pedsInitialOutpatient: {
                label: "Peds Initial Outpatient Visit",
                allowedFor: allowedForAll,
                encounterTypeConfig: EncounterTypeConfig,
                elements: [
                    addExpectedEncounters,
                    checkIn,
                    vaccinations,
                    supplements,
                    vitals,
                    reviewAllergies,
                    primaryCareHistory,
                    feeding,
                    primaryCareExam,
                    primaryCareDx,
                    outpatientPlan,
                    primaryCareDisposition

                ]
            },
            pedsFollowupOutpatient: {
                label: "Peds Followup Outpatient Visit",
                allowedFor: allowedForAll,
                encounterTypeConfig: EncounterTypeConfig,
                elements: [
                    addExpectedEncounters,
                    checkIn,
                    vaccinations,
                    supplements,
                    vitals,
                    feeding,
                    primaryCareExam,
                    primaryCareDx,
                    outpatientPlan,
                    primaryCareDisposition
                ]
            }
        };
        _.each(ret, function(it, key) {
            it.name = key;
        });
        return ret;
    }]);


