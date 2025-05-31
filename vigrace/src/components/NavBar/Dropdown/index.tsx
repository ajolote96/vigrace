import {
  Dropdown,
  DropdownItem,
  Button,
  DropdownTrigger,
  DropdownMenu,
} from "@heroui/react";
import useStore from "../../../store";

export default function LanguageDropdown() {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button size="sm" variant="flat">
          {language === "es" ? "🇲🇽 Español" : "🇬🇧 English"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="es"
          onPress={() => setLanguage("es")}
          startContent="🇲🇽"
        >
          Español
        </DropdownItem>
        <DropdownItem
          key="en"
          onPress={() => setLanguage("en")}
          startContent="🇬🇧"
        >
          English
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
