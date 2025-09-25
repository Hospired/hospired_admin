import * as React from 'react';

interface PopoverController<T> {
    anchorRef: React.MutableRefObject<T | null>;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleToggle: () => void;
}

export function usePopover<T = HTMLElement>(): PopoverController<T> {
    const anchorRef = React.useRef<T | null>(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = React.useCallback(() => setOpen(true), []);
    const handleClose = React.useCallback(() => setOpen(false), []);
    const handleToggle = React.useCallback(() => setOpen((prev) => !prev), []);

    return { anchorRef, open, handleOpen, handleClose, handleToggle };
}
