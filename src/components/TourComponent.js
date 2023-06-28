import { Button, Tour } from 'antd';
import { useRef, useState } from 'react';
const TourComponent = ({ ref_upload, ref_init_state, ref_black_list, ref_colors}) => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const steps = [
        {
            title: 'Tour',
            description: 'This will be a quick tour on how to use this application',
            target: null,
        },
        {
            title: 'File',
            description: 'First upload your YAML file',
            placement: 'right',
            target: () => ref_upload.current,
        },
        {
            title: 'Init state',
            description: 'Pick your initial state, that will be the parent node when the graph is displayed',
            placement: 'right',
            target: () => ref_init_state.current,
        },
        {
            title: 'Black list',
            description: 'If you prefer a graph with fewer states displayed, you can choose the desired option from the dropdown menu. This will remove the selected state and all its subsequent child states, allowing you to concentrate on the specific elements you need within the flow.',
            placement: 'right',
            target: () => ref_black_list.current,
        },
    ];
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} ref={ref}>
                Begin Tour
            </Button>

            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </>
    );
};
export default TourComponent;
