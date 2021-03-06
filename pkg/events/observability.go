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

package events

import (
	"github.com/prometheus/client_golang/prometheus"
	"go.thethings.network/lorawan-stack/v3/pkg/metrics"
)

const subsystem = "events"

var publishes = metrics.NewCounterVec(
	prometheus.CounterOpts{
		Subsystem: subsystem,
		Name:      "publishes_total",
		Help:      "Number of Publishes to the default events PubSub",
	},
	[]string{"name"},
)

var channelDropped = metrics.NewCounterVec(
	prometheus.CounterOpts{
		Subsystem: subsystem,
		Name:      "channel_dropped_total",
		Help:      "Number of events dropped from event channels",
	},
	[]string{"name"},
)

func initMetrics(name string) {
	publishes.WithLabelValues(name).Add(0)
	channelDropped.WithLabelValues(name).Add(0)
}

func init() {
	metrics.MustRegister(publishes, channelDropped)
}
