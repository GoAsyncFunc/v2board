import React from "react";
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { StripeCardElementOptions, StripeCardElementChangeEvent, Token } from "@stripe/stripe-js";

interface StripeCardFormProps {
    callback?: (error: string | null | undefined, token?: Token) => void;
    children?: React.ReactNode;
}

interface StripePaymentFormProps extends StripeCardFormProps {
    pk: string;
}

const cardElementOptions: StripeCardElementOptions = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

function CardField({ onChange }: { onChange: (event: StripeCardElementChangeEvent) => void }) {
    return <CardElement onChange={onChange} options={cardElementOptions} />;
}

export function StripeCardForm({ callback, children }: StripeCardFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const handleChange = async () => {
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card!);

        if (result.error) {
            if (typeof callback === "function") {
                callback(result.error.message);
            }
            return;
        }

        if (typeof callback === "function") {
            callback(null, result.token);
        }
    };

    return (
        <React.Fragment>
            <CardField onChange={handleChange} />
            {children}
        </React.Fragment>
    );
}

export default class StripePaymentForm extends React.Component<StripePaymentFormProps> {
    render() {
        const stripePromise = loadStripe(this.props.pk);

        return (
            <Elements stripe={stripePromise}>
                <StripeCardForm callback={this.props.callback}>
                    {this.props.children}
                </StripeCardForm>
            </Elements>
        );
    }
}
