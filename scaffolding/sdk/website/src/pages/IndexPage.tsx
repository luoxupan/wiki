import * as React from "react";
import { ModalPage} from './ModalPage';
import { UploadPage} from './UploadPage';
import { DrawerPage} from './DrawerPage';
import { GroupListPage} from './GroupListPage';
import { GroupSelectionPage} from './GroupSelectionPage';

export function IndexPage(props: any) {

  const [open, setOpen] = React.useState(false);

  return (
    <div className="index-page">
      <DrawerPage />
      <ModalPage />
      <UploadPage />
      <GroupSelectionPage />
      <GroupListPage />
    </div>
  );
}
