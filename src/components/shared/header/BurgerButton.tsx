import BurgerButtonIcon from "../icons/BurgerButtonIcon";

interface BurgerMenuButtonProps {
  toggleHeaderMenuOpen?: () => void;
}

export default function BurgerMenuButton({
  toggleHeaderMenuOpen,
}: BurgerMenuButtonProps) {
  return (
    <button
      aria-label="open menu button"
      type="button"
      onClick={toggleHeaderMenuOpen}
      className="md:hidden group relative w-6 h-6 outline-none"
    >
      <BurgerButtonIcon className="w-full h-full text-white" />
    </button>
  );
}
