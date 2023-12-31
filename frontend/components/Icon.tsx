
export type IconType = "logo" | "user" | "menu" | "back" | "logout" | "sun" | "moon" | "fire" | "selfie" | 'delete' | 'spinner' | 'down';

export default function Icon({
  type,
  className = "w-6 h-6",
}: {
  type: IconType;
  className?: string;
}) {
  return (
    <>
      {
        {
          logo: (
            <svg
              width="94"
              height="94"
              viewBox="0 0 94 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={className}
            >
              <path
                d="M64.108 57.34L46.906 74.542L39.856 67.586L35.344 72.192L46.906 83.754L68.808 61.852L64.108 57.34Z"
                fill="#6C6DC0"
              />
              <path
                d="M24.722 43.8979H69.09L62.792 50.1959H26.79L24.722 52.4519L33.558 61.0059L28.764 65.5179L15.792 52.4519L24.722 43.8979Z"
                fill="#595959"
              />
              <path
                d="M63.3559 21.6518C63.3169 12.6324 55.9995 5.65044 46.7675 5.83144C37.7124 6.00897 30.8621 12.8053 30.8321 21.6518C30.8017 30.6374 37.96 37.6359 47.1593 37.5999C56.3233 37.564 63.3946 30.603 63.3559 21.6518Z"
                fill="#595959"
                stroke="#595959"
              />
              <path
                d="M57.5279 21.6732C57.5029 15.7492 52.808 11.1634 46.8845 11.2823C41.0746 11.3989 36.6793 15.8628 36.6601 21.6732C36.6406 27.575 41.2335 32.1716 47.1359 32.1479C53.0157 32.1243 57.5528 27.5523 57.5279 21.6732Z"
                fill="white"
                stroke="#595959"
              />
            </svg>
          ),
          user: (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 9.91992C10.1935 9.91992 11.3381 9.44582 12.182 8.6019C13.0259 7.75799 13.5 6.6134 13.5 5.41992C13.5 4.22645 13.0259 3.08186 12.182 2.23794C11.3381 1.39403 10.1935 0.919922 9 0.919922C7.80653 0.919922 6.66193 1.39403 5.81802 2.23794C4.97411 3.08186 4.5 4.22645 4.5 5.41992C4.5 6.6134 4.97411 7.75799 5.81802 8.6019C6.66193 9.44582 7.80653 9.91992 9 9.91992ZM12 5.41992C12 6.21557 11.6839 6.97863 11.1213 7.54124C10.5587 8.10385 9.79565 8.41992 9 8.41992C8.20435 8.41992 7.44129 8.10385 6.87868 7.54124C6.31607 6.97863 6 6.21557 6 5.41992C6 4.62427 6.31607 3.86121 6.87868 3.2986C7.44129 2.73599 8.20435 2.41992 9 2.41992C9.79565 2.41992 10.5587 2.73599 11.1213 3.2986C11.6839 3.86121 12 4.62427 12 5.41992ZM18 17.4199C18 18.9199 16.5 18.9199 16.5 18.9199H1.5C1.5 18.9199 0 18.9199 0 17.4199C0 15.9199 1.5 11.4199 9 11.4199C16.5 11.4199 18 15.9199 18 17.4199ZM16.5 17.4139C16.4985 17.0449 16.269 15.9349 15.252 14.9179C14.274 13.9399 12.4335 12.9199 9 12.9199C5.565 12.9199 3.726 13.9399 2.748 14.9179C1.731 15.9349 1.503 17.0449 1.5 17.4139H16.5Z"
                fill="#1E1E1E"
              />
            </svg>
          ),
          menu: (
            <svg
              width="21"
              height="12"
              viewBox="0 0 21 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:hidden"
            >
              <path
                d="M21.6 10.6699C21.6 10.471 21.5052 10.2802 21.3364 10.1396C21.1676 9.99894 20.9387 9.91992 20.7 9.91992H15.3C15.0613 9.91992 14.8324 9.99894 14.6636 10.1396C14.4948 10.2802 14.4 10.471 14.4 10.6699C14.4 10.8688 14.4948 11.0596 14.6636 11.2003C14.8324 11.3409 15.0613 11.4199 15.3 11.4199H20.7C20.9387 11.4199 21.1676 11.3409 21.3364 11.2003C21.5052 11.0596 21.6 10.8688 21.6 10.6699ZM21.6 6.16992C21.6 5.97101 21.5052 5.78024 21.3364 5.63959C21.1676 5.49894 20.9387 5.41992 20.7 5.41992H8.1C7.86131 5.41992 7.63239 5.49894 7.4636 5.63959C7.29482 5.78024 7.2 5.97101 7.2 6.16992C7.2 6.36883 7.29482 6.5596 7.4636 6.70025C7.63239 6.8409 7.86131 6.91992 8.1 6.91992H20.7C20.9387 6.91992 21.1676 6.8409 21.3364 6.70025C21.5052 6.5596 21.6 6.36883 21.6 6.16992ZM21.6 1.66992C21.6 1.47101 21.5052 1.28024 21.3364 1.13959C21.1676 0.99894 20.9387 0.919922 20.7 0.919922H0.9C0.661305 0.919922 0.432387 0.99894 0.263604 1.13959C0.0948213 1.28024 0 1.47101 0 1.66992C0 1.86883 0.0948213 2.0596 0.263604 2.20025C0.432387 2.3409 0.661305 2.41992 0.9 2.41992H20.7C20.9387 2.41992 21.1676 2.3409 21.3364 2.20025C21.5052 2.0596 21.6 1.86883 21.6 1.66992Z"
                fill="#1E1E1E"
              />
            </svg>
          ),

          back: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={className}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          ),

          logout: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>),
          sun: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>,
          moon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>,
          fire: (
            <svg width="48" height="48" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className={className} preserveAspectRatio="xMidYMid meet"><radialGradient id="IconifyId17ecdb2904d178eab8626" cx="68.884" cy="124.296" r="70.587" gradientTransform="matrix(-1 -.00434 -.00713 1.6408 131.986 -79.345)" gradientUnits="userSpaceOnUse"><stop offset=".314" stopColor="#ff9800"></stop><stop offset=".662" stopColor="#ff6d00"></stop><stop offset=".972" stopColor="#f44336"></stop></radialGradient><path d="M35.56 40.73c-.57 6.08-.97 16.84 2.62 21.42c0 0-1.69-11.82 13.46-26.65c6.1-5.97 7.51-14.09 5.38-20.18c-1.21-3.45-3.42-6.3-5.34-8.29c-1.12-1.17-.26-3.1 1.37-3.03c9.86.44 25.84 3.18 32.63 20.22c2.98 7.48 3.2 15.21 1.78 23.07c-.9 5.02-4.1 16.18 3.2 17.55c5.21.98 7.73-3.16 8.86-6.14c.47-1.24 2.1-1.55 2.98-.56c8.8 10.01 9.55 21.8 7.73 31.95c-3.52 19.62-23.39 33.9-43.13 33.9c-24.66 0-44.29-14.11-49.38-39.65c-2.05-10.31-1.01-30.71 14.89-45.11c1.18-1.08 3.11-.12 2.95 1.5z" fill="url(#IconifyId17ecdb2904d178eab8626)"></path><radialGradient id="IconifyId17ecdb2904d178eab8627" cx="64.921" cy="54.062" r="73.86" gradientTransform="matrix(-.0101 .9999 .7525 .0076 26.154 -11.267)" gradientUnits="userSpaceOnUse"><stop offset=".214" stopColor="#fff176"></stop><stop offset=".328" stopColor="#fff27d"></stop><stop offset=".487" stopColor="#fff48f"></stop><stop offset=".672" stopColor="#fff7ad"></stop><stop offset=".793" stopColor="#fff9c4"></stop><stop offset=".822" stopColor="#fff8bd" stopOpacity=".804"></stop><stop offset=".863" stopColor="#fff6ab" stopOpacity=".529"></stop><stop offset=".91" stopColor="#fff38d" stopOpacity=".209"></stop><stop offset=".941" stopColor="#fff176" stopOpacity="0"></stop></radialGradient><path d="M76.11 77.42c-9.09-11.7-5.02-25.05-2.79-30.37c.3-.7-.5-1.36-1.13-.93c-3.91 2.66-11.92 8.92-15.65 17.73c-5.05 11.91-4.69 17.74-1.7 24.86c1.8 4.29-.29 5.2-1.34 5.36c-1.02.16-1.96-.52-2.71-1.23a16.09 16.09 0 0 1-4.44-7.6c-.16-.62-.97-.79-1.34-.28c-2.8 3.87-4.25 10.08-4.32 14.47C40.47 113 51.68 124 65.24 124c17.09 0 29.54-18.9 19.72-34.7c-2.85-4.6-5.53-7.61-8.85-11.88z" fill="url(#IconifyId17ecdb2904d178eab8627)"></path></svg>),
          selfie: (<svg width="48" height="48" viewBox="0 0 72 72" id="emoji" version="1.1" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g id="color">
              <path fill="#B399C8" d="M4,70.6667v-17.5L26.75,52.25l16.6667-17.9167c1.0833,2.2917,7.6667,6.25,10.0833,6.5L38.5,65.75 C37.4583,67.625,23.0693,70.6667,4,70.6667z" />
              <polyline fill="#92D3F5" points="64.2079,27.8958 64.2498,4.9708 49.6758,5.0494 49.6368,26.3997" />
            </g>
            <g id="hair" />
            <g id="skin">
              <path fill="#FCEA2B" d="M64.837,20.0537c1.0597,0.1522,1.6563,0.9253,1.6457,1.9381c-0.0099,0.9466-0.5375,1.9321-1.6843,1.9033 c0,0-1.2147-0.0379-1.6188-0.015c-0.1713,0.0097-0.3427,0.0192-0.5125-0.0051c-1.0597-0.1522-1.7953-1.1346-1.6431-2.1943 s1.1346-1.7953,2.1943-1.6431C63.2183,20.0376,64.837,20.0539,64.837,20.0537z" />
              <path fill="#FCEA2B" d="M64.8758,16.1978c1.0597,0.1522,1.6563,0.9253,1.6457,1.9381c-0.0099,0.9466-0.5375,1.9321-1.6843,1.9033 c0,0-1.2147-0.0379-1.6188-0.015c-0.1713,0.0097-0.3427,0.0192-0.5125-0.0051c-1.0597-0.1522-1.7953-1.1346-1.6431-2.1943 s1.1346-1.7953,2.1943-1.6431C63.257,16.1818,64.8758,16.198,64.8758,16.1978z" />
              <path fill="#FCEA2B" d="M51.2751,26.2517c-0.2374-0.9177-0.7139-1.7561-1.381-2.4296l0.0252-0.0391l0.5511-0.8399 c0.2598-0.396,1.1637-0.3694,2.008,0.0605l0.4053,0.2057c0.8445,0.4295,1.8686,0.2729,2.3229-0.4194 c0.4543-0.6923,0.1396-1.6255-0.6525-2.1452l-3.6001-2.3623c-0.7818-0.5361-1.8459-0.3709-2.4284,0.377l-2.8853,3.8816 c-2.0153,3.1257,1.0264,12.2507-0.9736,13.1465c1.6544,1.5527,3.2083,2.7292,7.1282,4.6602 c1.7052-4.6602,9.7468-6.5977,11.5385-12.681" />
            </g>
            <g id="skin-shadow" />
            <g id="line">
              <line x1="4" x2="4" y1="53.1667" y2="70.6667" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
              <line x1="26.75" x2="4" y1="52.25" y2="53.1667" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
              <line x1="53.5" x2="38.5" y1="40.8333" y2="65.75" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
              <line x1="43.4167" x2="26.75" y1="34.3333" y2="52.25" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M38.5,65.75c-1.0417,1.875-15.4307,4.9167-34.5,4.9167" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M43.4167,34.3333c1.0833,2.2917,7.6667,6.25,10.0833,6.5" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M49.9193,23.783 l0.5511-0.8399c0.2598-0.396,1.1637-0.3694,2.008,0.0605l0.4053,0.2057c0.8445,0.4295,1.8686,0.2729,2.3229-0.4194 c0.4543-0.6923,0.1396-1.6255-0.6525-2.1452l-3.6001-2.3623c-0.7818-0.5361-1.8459-0.3709-2.4284,0.377l-2.8853,3.8816" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M51.2751,26.2517 c-0.2374-0.9177-0.7139-1.7561-1.381-2.4296" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M45.6403,22.541 c-2.0153,3.1257,1.0264,12.2507-0.9736,13.1465" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M63.3333,27.6667 C61.5417,33.75,53.5,35.6875,51.7948,40.3477" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M64.837,20.0537 c1.0597,0.1522,1.6563,0.9253,1.6457,1.9381c-0.0099,0.9466-0.5375,1.9321-1.6843,1.9033c0,0-1.2147-0.0379-1.6188-0.015 c-0.1713,0.0097-0.3427,0.0192-0.5125-0.0051c-1.0597-0.1522-1.7953-1.1346-1.6431-2.1943s1.1346-1.7953,2.1943-1.6431 C63.2183,20.0376,64.837,20.0539,64.837,20.0537z" />
              <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M64.8758,16.1978 c1.0597,0.1522,1.6563,0.9253,1.6457,1.9381c-0.0099,0.9466-0.5375,1.9321-1.6843,1.9033c0,0-1.2147-0.0379-1.6188-0.015 c-0.1713,0.0097-0.3427,0.0192-0.5125-0.0051c-1.0597-0.1522-1.7953-1.1346-1.6431-2.1943s1.1346-1.7953,2.1943-1.6431 C63.257,16.1818,64.8758,16.198,64.8758,16.1978z" />
              <line x1="63.28" x2="63.28" y1="12.6399" y2="4" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <line x1="50.5846" x2="63.28" y1="4" y2="4" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <line x1="50.5846" x2="50.5846" y1="4" y2="14.5552" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>),

          delete: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>,
          spinner: <div className="h-6 w-6 rounded-full border-2 border-l-transparent animate-spin"></div>,
          down: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        }[type]
      }
    </>
  );
}
