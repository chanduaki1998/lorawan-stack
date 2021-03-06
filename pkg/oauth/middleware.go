// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package oauth

import (
	"fmt"
	"net/http"
	"net/url"
	"path"

	echo "github.com/labstack/echo/v4"
)

const nextKey = "n"

func (s *server) redirectToLogin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		_, err := s.session.Get(c)
		if err != nil {
			values := make(url.Values)
			values.Set(nextKey, fmt.Sprintf("%s?%s", c.Request().URL.Path, c.QueryParams().Encode()))
			return c.Redirect(http.StatusFound, fmt.Sprintf("%s?%s", path.Join(s.config.Mount, "login"), values.Encode()))
		}
		return next(c)
	}
}
