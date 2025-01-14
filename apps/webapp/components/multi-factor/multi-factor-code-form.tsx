const CodeForm = ({
  totpUri,
  code,
  setCode,
  loading,
  onVerify,
}: {
  totpUri: string;
  code: string;
  setCode: (value: string) => void;
  loading: boolean;
  onVerify: () => void;
}) => {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="text-start px-6 py-4 flex items-center gap-4 text-sm rounded-lg border mb-4">
        <TerminalIcon className="h-4 w-4" />
        <p className="text-muted-foreground">
          If your app asks for an issuer use <strong>Craftly</strong>.
        </p>
      </div>
      <QRCode value={totpUri} size={256} className="mx-auto" />
      <p className="text-sm text-muted-foreground mt-4 mb-5">
        Scan this QR code with your authenticator app, then enter the 6 digit
        code below.
      </p>
      <InputOTP
        className="mx-auto"
        maxLength={6}
        value={code}
        onChange={(value) => setCode(value)}
        pattern={REGEXP_ONLY_DIGITS}
        disabled={loading}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="flex justify-end w-full mt-8">
        <Button
          disabled={!code || code.length < 6 || loading}
          onClick={onVerify}
        >
          Turn On
        </Button>
      </div>
    </div>
  );
};

export default CodeForm;