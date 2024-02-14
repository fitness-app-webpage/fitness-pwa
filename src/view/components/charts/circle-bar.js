import { LitElement, html, css } from "lit";
import { getProductByName } from "../../../service/ApiService";
import {until} from 'lit/directives/until.js';
import Chart from "chart.js/auto"

export default class CircleBar extends LitElement{
    static get properties() {
        return{
            data: {type: Array},
            text: {type: String},
            secondtext: {type: String},
            textcolor: {type: String}
        }
    }

    constructor() {
        super();
        this.data = []
        this.text = "default"
        this.secondtext = "second text"
        this.textcolor = "#000000"
    }
    firstUpdated() {
        super.firstUpdated()
        this._renderGraph();
    }
    

    static get styles(){
        return css`
        .container {
            width: var(--circle-width, 200px);
            height: var(--circle-height, 200px);
        }  
        `;
    }
    
    render(){
        return html`
            <div class="container">
                <canvas id="chart"></canvas>
            </div>
        `
    };
    _renderGraph() {
        const ctx = this.renderRoot.querySelector( '#chart' ).getContext('2d');
        const ChartDataLabels = this.data.map(e => e.label + " " + e.value)
        const labels = this.data.map(e => e.label)
        const canvasBackgroundColor = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
              const {ctx} = chart;
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = options.color || 'transparent';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            },
            afterDatasetsDraw: (chart, args, options) => {
            const {ctx} = chart;
              ctx.save();
              const xCord = chart.getDatasetMeta(0).data[0].x
              const yCord = chart.getDatasetMeta(0).data[0].y
              ctx.font = 'bold 20px Inter-SemiBold, Helvetica'
              ctx.fillStyle = this.textcolor
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillText(this.text, xCord, yCord - 5)

              ctx.font = 'bold 15px Inter-SemiBold, Helvetica'
              ctx.fillText(this.secondtext, xCord, yCord + 15)
              ctx.restore();
            }
          };
        this._chart = new Chart(ctx, {
            responsive: true,
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: "",
                    data: this.data,
                    backgroundColor: this.data.length === 0 
                    ? [ '#00C300',
                        '#00AF5B',
                        '#00977F',
                        '#007D8A',
                        '#00627A',
                        '#2F4858',
                        '#97AFB9',
                        '#647B84',
                        '#6F4F72',
                        '#A380A6'
                    ]
                    :this.data.map(e => {
                        return e.color
                    }),
                    borderColor: [
                        '#ffffff'
                    ],
                    borderWidth: 2,
                    cutout: '85%'
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                       formatter: (value, ctx) => {
                           const total = ctx.dataset.data.reduce((total, val) => total + val, 0);
                           const percentage = (value / total) * 100;
                           return percentage.toFixed(1) + "%";                        
                       },
                       color: '#fff',
                    },
                    // title: {
                    //     display: true,
                    //     text: this.title,
                    //     font: {weight: 'bolder'}
                    // },
                    legend: {
                        display: false,
                        position: "top",
                        align: "center",
                      }
                }
            },
            plugins: [canvasBackgroundColor, ChartDataLabels]
        });
    }
}
customElements.define('circle-bar', CircleBar); 