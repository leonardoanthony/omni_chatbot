export default function startConfigOptions(){
    return {
        blockCrashLogs: false,
          disableSpins: false,
          logConsole: false,
          viewport: {
              width: 1920,
              height: 1200,
          },
          deleteSessionDataOnLogout: false,
          popup: 3012,
          defaultViewport: null,
          sessionId: '!Robot',
          headless: true,
          multiDevice: true,
          qrTimeout: 0,
          authTimeout: 99999999,
          restartOnCrash: false,
          useChrome: true,
          killProcessOnBrowserClose: true,
          throwErrorOnTosBlock: false,
          hostNotificationLang: 'PT_BR',
          chromiumArgs: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--aggressive-cache-discard',
              '--disable-cache',
              '--disable-application-cache',
              '--disable-offline-load-stale-cache',
              '--disk-cache-size=0',
          ],
      }
}