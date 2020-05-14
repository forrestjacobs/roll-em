Formula
  = _ sign: Sign? _ head: Value _ tail: Term*
    {
      return [
        {
          sign: sign || +1,
          ...head
        }
      ].concat(tail);
    }

Term
  = sign: Sign _ value: Value _
    {
      return {
        sign,
        ...value
      };
    }

Sign
  = "+" { return 1; }
  / "-" { return -1; }

Value
  = count: Integer? _ D _ sides: Integer
    { return { type: "roll", count: count === null ? 1 : count, sides }; }
  / value: Integer
    { return { type: "number", value }; }

Integer "integer"
  = [0-9]+
    { return parseInt(text(), 10); }

D = "d" / "D"

_ "whitespace" = [ \t\n\r]*
