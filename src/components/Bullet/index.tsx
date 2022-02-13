import { ImageIndex } from "./styles";

interface BullletProps {
    active?: boolean;
}

export function Bullet({ active = false, }: BullletProps) {
    return (
        <ImageIndex
            active={active}
        />
    )
}