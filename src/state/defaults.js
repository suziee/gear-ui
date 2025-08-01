import * as NAME from './hooks/hookNames';
import useMessenger from './hooks/useMessenger';
import useCamData from './hooks/useCamData';
import useCalibrateForm from './hooks/useCalibrateForm';
import useHeaderMenu from './hooks/useHeaderMenu';
import useCamState from './hooks/useCamState';

export default function getDefaults(args) {
    const messenger = useMessenger();

    let defaults = {
        [NAME.useMessenger]: messenger,
    }

    const camData = useCamData({
        messenger: messenger,
    });

    defaults = {
        ...defaults,
        [NAME.useCamData]: camData,
        [NAME.useCamState]: useCamState({
            camData: camData
        }),
        [NAME.useCalibrateForm]: useCalibrateForm({
            messenger: messenger, // unnecessary for this hook for now
        }),
        [NAME.useHeaderMenu]: useHeaderMenu({
            messenger: messenger,
        }),
    };

    // console.log("in defaults")

    return defaults;
}