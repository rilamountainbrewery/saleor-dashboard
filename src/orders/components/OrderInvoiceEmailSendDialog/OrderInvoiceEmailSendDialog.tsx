import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import FormSpacer from "@saleor/components/FormSpacer";
import { buttonMessages } from "@saleor/intl";
import { InvoiceErrorFragment } from "@saleor/orders/types/InvoiceErrorFragment";
import { InvoiceFragment } from "@saleor/orders/types/InvoiceFragment";
import getInvoiceErrorMessage from "@saleor/utils/errors/invoice";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface FormData {
  amount: number;
}

export interface OrderInvoiceEmailSendDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: InvoiceErrorFragment[];
  open: boolean;
  invoice: InvoiceFragment;
  onClose: () => void;
  onSubmit: () => void;
}

const OrderInvoiceEmailSendDialog: React.FC<OrderInvoiceEmailSendDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  invoice,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <Form onSubmit={onSubmit}>
        {({ submit }) => (
          <>
            <DialogTitle>
              {intl.formatMessage({
                defaultMessage: "Send Invoice",
                description: "dialog header"
              })}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <FormattedMessage
                  defaultMessage="Are you sure you want to send this invoice: {invoiceNumber} to the customer?"
                  values={{
                    invoiceNumber: <strong>{invoice?.number}</strong>
                  }}
                />
              </DialogContentText>
              {errors.length > 0 && (
                <>
                  <FormSpacer />
                  {errors.map(err => (
                    <DialogContentText color="error">
                      {getInvoiceErrorMessage(err, intl)}
                    </DialogContentText>
                  ))}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
              >
                <FormattedMessage {...buttonMessages.send} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderInvoiceEmailSendDialog.displayName = "OrderInvoiceEmailSendDialog";
export default OrderInvoiceEmailSendDialog;