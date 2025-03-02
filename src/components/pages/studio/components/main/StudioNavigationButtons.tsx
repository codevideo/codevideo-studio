import * as React from 'react';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { setActions, setCurrentActionIndex, setIsFullScreen } from '../../../../../store/editorSlice';
import { setIsRecording, turnOffRecording } from '../../../../../store/recordingSlice';
import { useRecordActions } from '../../../../../hooks/useRecordActions';
import { Flex, Button } from '@radix-ui/themes';
import { ActionCounter } from '../../../../utils/ActionCounter';
import { EnterFullScreenIcon } from '@radix-ui/react-icons';
import { addToast } from '../../../../../store/toastSlice';

export function StudioNavigationButtons() {
    const { currentActions, currentActionIndex, isFullScreen } = useAppSelector(state => state.editor);
    const { isRecording, collectedRecordedActions } = useAppSelector(state => state.recording);
    const dispatch = useAppDispatch();
    useRecordActions();

    const handleFirst = () => {
        dispatch(setCurrentActionIndex(0));
    }

    const handleJumpBackward = () => {
        dispatch(setCurrentActionIndex(Math.max(0, currentActionIndex - 10)));
    }

    const handlePrevious = () => {
        dispatch(setCurrentActionIndex(Math.max(0, currentActionIndex - 1)));
    };

    const handleNext = () => {
        dispatch(setCurrentActionIndex(Math.min(currentActions.length - 1, currentActionIndex + 1)));
    };

    const handleJumpForward = () => {
        dispatch(setCurrentActionIndex(Math.min(currentActions.length - 1, currentActionIndex + 10)));
    }

    const handleLast = () => {
        dispatch(setCurrentActionIndex(currentActions.length - 1));
    }

    const handleRecord = () => {
        // if we are turning off recording, insert the collected actions into the current actions at the current index
        if (isRecording) {
            const newActions = [...currentActions];
            newActions.splice(currentActionIndex + 1, 0, ...collectedRecordedActions);

            // set the new actions & update the current action index
            dispatch(setActions(newActions));
            dispatch(setCurrentActionIndex(currentActionIndex + collectedRecordedActions.length));

            dispatch(addToast(`Added ${collectedRecordedActions.length} new actions to the project.`));

            // clean up recording state
            dispatch(turnOffRecording());
        } else {
            dispatch(setIsRecording(true));
        }
    }

    const recordButtonText = isRecording ? `Stop` : <>Record<sup style={{fontSize: '0.5rem', paddingBottom: '1rem'}}>Beta</sup></>;

    return (
        <Flex
            justify="between"
            align="center"
            pb="3"
        >
            <Flex gap="2" align="center">
                <Button
                    onClick={handleFirst}
                    disabled={currentActionIndex === 0}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === 0 ? 0.5 : 1,
                        cursor: currentActionIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    {'<<<'} First
                </Button>
                <Button
                    onClick={handleJumpBackward}
                    disabled={currentActionIndex === 0}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === 0 ? 0.5 : 1,
                        cursor: currentActionIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    -10 {'<<'}
                </Button>
                <Button
                    onClick={handlePrevious}
                    disabled={currentActionIndex === 0}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === 0 ? 0.5 : 1,
                        cursor: currentActionIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    {'<'} Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={currentActionIndex === currentActions.length - 1}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === currentActions.length - 1 ? 0.5 : 1,
                        cursor: currentActionIndex === currentActions.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next {'>'}
                </Button>
                <Button
                    onClick={handleJumpForward}
                    disabled={currentActionIndex === currentActions.length - 1}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === currentActions.length - 1 ? 0.5 : 1,
                        cursor: currentActionIndex === currentActions.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    +10 {'>>'}
                </Button>
                <Button
                    onClick={handleLast}
                    disabled={currentActionIndex === currentActions.length - 1}
                    color="mint"
                    variant="soft"
                    style={{
                        opacity: currentActionIndex === currentActions.length - 1 ? 0.5 : 1,
                        cursor: currentActionIndex === currentActions.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Last {'>>>'}
                </Button>
                <ActionCounter />
            </Flex>
            <Flex align="center" gap="2">
                <Button
                    title={isRecording ? 'Stop recording' : 'Start recording actions (beta)'}
                    onClick={handleRecord}
                    color="red"
                    variant="soft"
                    style={{ cursor: 'pointer' }}
                >
                    {recordButtonText}
                </Button>
                <Button
                    title='Toggle Full Screen'
                    onClick={() => dispatch(setIsFullScreen(!isFullScreen))}
                    color="mint"
                    variant="soft"
                    style={{ cursor: 'pointer' }}
                >
                    <EnterFullScreenIcon />
                </Button>
            </Flex>
        </Flex>
    );
}