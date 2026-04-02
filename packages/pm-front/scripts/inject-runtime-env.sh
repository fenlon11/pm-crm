#!/bin/sh

echo "Injecting runtime environment variables into index.html..."

CONFIG_BLOCK=$(cat << EOF
    <script id="pm-env-config">
      window._env_ = {
        REACT_APP_SERVER_BASE_URL: "$REACT_APP_SERVER_BASE_URL"
      };
    </script>
    <!-- END: PM Config -->
EOF
)
# Use sed to replace the config block in index.html
# Using pattern space to match across multiple lines
echo "$CONFIG_BLOCK" | sed -i.bak '
  /<!-- BEGIN: PM Config -->/,/<!-- END: PM Config -->/{
    /<!-- BEGIN: PM Config -->/!{
      /<!-- END: PM Config -->/!d
    }
    /<!-- BEGIN: PM Config -->/r /dev/stdin
    /<!-- END: PM Config -->/d
  }
' build/index.html
rm -f build/index.html.bak
