interface Props {
    selectedCategoryId: number | null;
    onSelectCategory: (id: number) => void;
}
declare const Sidebar: React.FC<Props>;
export default Sidebar;
