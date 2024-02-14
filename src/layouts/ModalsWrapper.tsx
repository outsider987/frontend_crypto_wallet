import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGlobal } from '~/store';
import { setAlertDialog } from '~/store/global';
import ErrorDialog from '~/components/modals/ErrorDialog';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // children: React.ReactNode;
}

const ModalsWrapper = (props: Props) => {
  const globalSelector = useSelector(selectGlobal);
  const dispatch = useDispatch();
  return (
    <>
      <ErrorDialog
        toggle={globalSelector.alertDialog.show}
        msg={globalSelector.alertDialog.msg}
        backdrop={() => dispatch(setAlertDialog({ ...globalSelector.alertDialog, show: false }))}
        titile={globalSelector.alertDialog.title}
      />
      {props.children}
    </>
  );
};
export default ModalsWrapper;
